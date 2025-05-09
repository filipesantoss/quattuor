import type { Beasts, Card } from "&/entity/card";
import type { Coordinate } from "&/entity/coordinate";
import type { Field } from "&/entity/field";
import type { Piece } from "&/entity/piece";
import type { Shrine } from "&/entity/shrine";

/**
 * @see https://redux.js.org/usage/structuring-reducers/normalizing-state-shape
 */
export interface Game {
  coordinates: Record<Coordinate["id"], Coordinate>;
  fields: Record<Field["id"], Field>;
  pieces: Record<Piece["id"], Piece>;
  cards: Record<Card["id"], Card>;
  beasts: Beasts[];
  shrines: Record<Shrine["id"], Shrine>;
}
