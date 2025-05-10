import type { Coordinate } from "&/entity/coordinate";
import type { Idol } from "&/entity/idol";

/**
 * A Shrine on the Game board.
 */
export interface Shrine {
  /**
   * A reference to the Shrine's owner.
   * Each Shrine is owned by a single Idol.
   */
  id: Idol["id"];

  /**
   * A reference to the Coordinate at which the Shrine is positioned.
   */
  coordinate: Coordinate["id"];

  /**
   * Whether the Shrine has been claimed by its Idol.
   */
  claimed: boolean;
}
