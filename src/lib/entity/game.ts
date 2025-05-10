import type { Coordinate } from "&/entity/coordinate";
import type { Field } from "&/entity/field";
import type { Idol } from "&/entity/idol";
import type { Shape } from "&/entity/shape";
import type { Shrine } from "&/entity/shrine";

/**
 * @see https://redux.js.org/usage/structuring-reducers/normalizing-state-shape
 */
export interface Game {
  coordinates: Record<Coordinate["id"], Coordinate>;
  idols: Record<Idol["id"], Idol>;
  shrines: Record<Shrine["id"], Shrine>;
  fields: Record<Field["id"], Field>;
  shapes: Record<Shape["id"], Shape>;
  sequence: Shape["id"][];
}
