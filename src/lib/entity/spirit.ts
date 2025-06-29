import { assert } from "&/assert";
import type { Idol } from "&/entity/idol";
import equal from "fast-deep-equal";

/**
 * The sixteen Creatures.
 */
export enum Creatures {
  Tiger = "Tiger",
  Dragon = "Dragon",
  Frog = "Frog",
  Rabbit = "Rabbit",
  Crab = "Crab",
  Elephant = "Elephant",
  Goose = "Goose",
  Rooster = "Rooster",
  Monkey = "Monkey",
  Mantis = "Mantis",
  Horse = "Horse",
  Ox = "Ox",
  Crane = "Crane",
  Boar = "Boar",
  Eel = "Eeel",
  Cobra = "Cobra",
}

export interface Movement {
  /**
   * The change in the y-axis.
   * A positive value represents a downard movement.
   * A negative value represents an upward movement.
   */
  dy: number;

  /**
   * The change in the x-axis.
   * A positive value represents a rightward movement.
   * A negative value represents a leftward movement.
   */
  dx: number;
}

export interface Beast {
  /**
   * A unique identifier for the Beast.
   */
  id: Creatures;

  /**
   * The Movements performed by the Beast.
   */
  movements: Movement[];

  /**
   * The Beast's symbol.
   */
  kanji: string;
}

/**
 * Verifies whether the Beast if able to perform the provided Movement.
 */
export function performs(this: Beast, movement: Movement): boolean {
  assert(this.movements.length > 0);
  return this.movements.some((known) => equal(known, movement));
}

/**
 * Verifies whether the Beast is the provided Creature.
 */
export function is(this: Beast, creature: Creatures): boolean {
  return this.id === creature;
}

export interface Spirit extends Beast {
  /**
   * A reference to the Idol that tamed this Beast.
   */
  master: Idol["id"];
}

/**
 * Verifies whether the Spirit has the provided Idol as its master.
 */
export function serves(this: Spirit, idol: Idol): boolean {
  return this.master === idol.id;
}
