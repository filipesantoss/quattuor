import type { Coordinate } from "&/state/entity/coordinate";
import type { Piece } from "&/state/entity/piece";

export interface Field {
  id: string;
  coordinate: Coordinate["id"];
  piece: Piece["id"] | null;
}
