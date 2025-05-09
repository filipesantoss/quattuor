import type { Card } from "&/state/entity/card";
import type { Coordinate } from "&/state/entity/coordinate";
import type { Field } from "&/state/entity/field";
import type { Piece } from "&/state/entity/piece";

/**
 * @see https://redux.js.org/usage/structuring-reducers/normalizing-state-shape
 */
export interface State {
  coordinates: Record<Coordinate["id"], Coordinate>;
  fields: Record<Field["id"], Field>;
  pieces: Record<Piece["id"], Piece>;
  cards: Record<Card["id"], Card>;
  turns: Card["id"][];
}
