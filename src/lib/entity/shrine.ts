import type { Coordinate } from "&/entity/coordinate";
import type { Elements, Piece } from "&/entity/piece";

export interface Shrine {
  id: Elements;
  coordinate: Coordinate["id"];
  piece: Piece["id"] | null;
}
