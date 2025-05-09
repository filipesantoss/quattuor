import type { Coordinate } from "&/state/entity/coordinate";

export interface Piece {
  id: Elements;
  coordinate: Coordinate["id"];
}

export enum Elements {
  Fire = "FIRE",
  Water = "WATER",
  Earth = "EARTH",
  Wind = "WIND",
}
