import { assert } from "&/assert";
import type { Idol } from "&/entity/idol";
import { resists, succumbs } from "&/entity/idol";
import type { Shrine } from "&/entity/shrine";
import type { Movement } from "&/entity/spirit";

interface Coordinate {
  /**
   * The x-axis Coordinate value.
   */
  x: number;

  /**
   * The y-axis Coordinate value.
   */
  y: number;
}

export interface Field extends Coordinate {
  /**
   * A unique identifier for the Field.
   */
  id: string;

  /**
   * A reference to the Idol occupying the Field.
   */
  occupier: Idol["id"] | null;

  /**
   * A reference to the Shrine located on the Field.
   */
  shrine: Shrine["id"] | null;

  /**
   * A reference to the Idol influencing the Field.
   */
  influencer: Idol["id"] | null;
}

/**
 * Calculates the target Coordinates when applying a Movement to the occupier of the Field.
 */
export function offset(this: Field, movement: Movement): Coordinate {
  return { x: this.x + movement.dx, y: this.y + movement.dy };
}

/**
 * Verifies whether the Field is located in the provided Coordinate.
 */
export function matches(this: Field, coordinate: Coordinate): boolean {
  return this.x === coordinate.x && this.y === coordinate.y;
}

/**
 * Verifies whether the provided Idol occupies the Field.
 */
export function hosts(this: Field, idol: Idol): boolean {
  return this.occupier === idol.id;
}

/**
 * Verifies whether the provided Idol can enter the Field.
 */
export function accepts(this: Field, idol: Idol): boolean {
  if (this.occupier !== null) {
    return false;
  }

  if (this.influencer === null) {
    return true;
  }

  return !succumbs.call(idol, this.influencer);
}

/**
 * Places the provided Shrine in the Field.
 */
export function abandon(this: Field, shrine: Shrine): void {
  assert(this.shrine === null);
  assert(this.occupier === null);
  assert(this.influencer === null);
  this.shrine = shrine.id;
}

/**
 * Allows the provided Idol to leave the Field.
 */
export function leave(this: Field, idol: Idol): void {
  assert(hosts.call(this, idol));
  this.occupier = null;
}

/**
 * Allows the provided Idol to enter the Field.
 */
export function enter(this: Field, idol: Idol): void {
  assert(accepts.call(this, idol));
  this.occupier = idol.id;

  if (this.influencer === null || resists.call(idol, this.influencer)) {
    this.influencer = idol.id;
  }
}
