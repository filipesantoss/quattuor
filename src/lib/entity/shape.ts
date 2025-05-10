import type { Idol } from "&/entity/idol";
import type { Movement } from "&/entity/movement";

/**
 * A Shape in the Game.
 */
export interface Shape {
  /**
   * The Beast represented by this Shape.
   * Each Beast is represented by a single Shape.
   */
  id: Beasts;

  /**
   * A reference to the Idol that mastered this Shape.
   */
  master: Idol["id"] | null;

  /**
   * The Movements known by the Beast represented by this Shape.
   */
  movements: Movement[];
}

/**
 * The sixteen Beasts.
 */
export enum Beasts {
  Tiger = "TIGER",
  Dragon = "DRAGON",
  Frog = "FROG",
  Rabbit = "RABBIT",
  Crab = "CRAB",
  Elephant = "ELEPHANT",
  Goose = "GOOSE",
  Rooster = "ROOSTER",
  Monkey = "MONKEY",
  Mantis = "MANTIS",
  Horse = "HORSE",
  Ox = "OX",
  Crane = "CRANE",
  Boar = "BOAR",
  Eel = "EEL",
  Cobra = "COBRA",
}
