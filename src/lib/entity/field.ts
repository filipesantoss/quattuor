import type { Coordinate } from "&/entity/coordinate";
import type { Piece } from "&/entity/piece";
import type { Shrine } from "&/entity/shrine";

export interface Field {
  id: string;
  coordinate: Coordinate["id"];
  piece: Piece["id"] | null;
  shrine: Shrine["id"] | null;
}
