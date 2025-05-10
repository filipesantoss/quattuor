import type { Coordinate } from "&/entity/coordinate";
import type { Idol } from "&/entity/idol";
import type { Shrine } from "&/entity/shrine";

/**
 * A Field on the Game board.
 */
export interface Field {
  /**
   * A reference to the Coordinate at which the Field is positioned.
   * Each Coordinate is owned by a single Field.
   */
  id: Coordinate["id"];

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
