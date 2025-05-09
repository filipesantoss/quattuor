import type { Coordinate } from "&/entity/coordinate";
import type { Elements, Idol } from "&/entity/idol";

export interface Shrine {
  id: Elements;
  coordinate: Coordinate["id"];
  idol: Idol["id"] | null;
}
