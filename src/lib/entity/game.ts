import type { Beasts, Card } from "&/entity/card";
import type { Coordinate } from "&/entity/coordinate";
import type { Field } from "&/entity/field";
import type { Idol } from "&/entity/idol";
import type { Shrine } from "&/entity/shrine";

/**
 * @see https://redux.js.org/usage/structuring-reducers/normalizing-state-shape
 */
export interface Game {
  coordinates: Record<Coordinate["id"], Coordinate>;
  fields: Record<Field["id"], Field>;
  idols: Record<Idol["id"], Idol>;
  cards: Record<Card["id"], Card>;
  beasts: Beasts[];
  shrines: Record<Shrine["id"], Shrine>;
}
