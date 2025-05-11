import { assert } from "&/assert";
import type { Idol } from "&/entity/idol";
import { conquers, succumbs } from "&/entity/idol";
import type { Shrine } from "&/entity/shrine";
import type { Movement } from "&/entity/spirit";

interface Coordinate {
  /**
   * The x-axis value of the Field.
   */
  x: number;

  /**
   * The y-axis value of the Field.
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

export function offset(this: Field, movement: Movement): Coordinate {
  return { x: this.x + movement.dx, y: this.y + movement.dy };
}

export function matches(this: Field, coordinate: Coordinate): boolean {
  return this.x === coordinate.x && this.y === coordinate.y;
}

export function hosts(this: Field, idol: Idol): boolean {
  return this.occupier === idol.id;
}

export function accepts(this: Field, idol: Idol): boolean {
  if (this.occupier !== null) {
    return false;
  }

  if (this.influencer === null) {
    return true;
  }

  return !succumbs.call(idol, this.influencer);
}

export function leave(this: Field, idol: Idol): void {
  assert(this.occupier === idol.id);
  this.occupier = null;
}

export function enter(this: Field, idol: Idol): boolean {
  assert(accepts.call(this, idol));
  this.occupier = idol.id;

  if (this.influencer === null || conquers.call(idol, this.influencer)) {
    this.influencer = idol.id;
  }

  return this.shrine === idol.id;
}
