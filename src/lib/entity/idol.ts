import type { Coordinate } from "&/entity/coordinate";

/**
 * An Idol on the Game board.
 */
export interface Idol {
  /**
   * The Element possessing the Idol.
   * Each Element possesses a single Idol.
   */
  id: Elements;

  /**
   * A reference to the Coordinate at which the Idol is positioned.
   */
  coordinate: Coordinate["id"];
}

/**
 * The four Elements.
 */
export enum Elements {
  Fire = "FIRE",
  Water = "WATER",
  Earth = "EARTH",
  Wind = "WIND",
}
