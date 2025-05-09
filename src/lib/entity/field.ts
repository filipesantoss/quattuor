import type { Coordinate } from "&/entity/coordinate";
import type { Idol } from "&/entity/idol";
import type { Shrine } from "&/entity/shrine";

export interface Field {
  id: string;
  coordinate: Coordinate["id"];
  idol: Idol["id"] | null;
  shrine: Shrine["id"] | null;
}
