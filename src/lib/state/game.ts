import type { Move } from "&/state/entity/card";
import type { Coordinate } from "&/state/entity/coordinate";
import type { Field } from "&/state/entity/field";
import type { Piece } from "&/state/entity/piece";
import { initial } from "&/state/initial";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import equal from "fast-deep-equal";

export const { reducer, selectors, actions } = createSlice({
  name: "game",
  initialState: initial,
  selectors: {
    fieldKeys(state): Field["id"][] {
      return Object.keys(state.fields);
    },
    fieldByFieldId(state, id: Field["id"]): Field | null {
      return state.fields[id] ?? null;
    },
    pieceByPieceId(state, id: Piece["id"]): Piece | null {
      return state.pieces[id] ?? null;
    },
    pieceByCoordinateId(state, id: Coordinate["id"]): Piece | null {
      return Object.values(state.pieces).find((piece) => piece.coordinate === id) ?? null;
    },
    moveByFieldId(state, id: Field["id"]): Move | null {
      const field = state.fields[id];
      if (field === undefined) {
        return null;
      }

      const end = state.coordinates[field.coordinate];
      if (end === undefined) {
        throw Error();
      }

      const [beast] = state.turns;
      if (beast === undefined) {
        throw Error();
      }

      const card = state.cards[beast];
      if (card.piece === null) {
        throw Error();
      }

      const start = state.coordinates[state.pieces[card.piece].coordinate];
      if (start === undefined) {
        throw Error();
      }

      const move = card.moves.find((move) => {
        const target = { x: start.x + move.dx, y: start.y + move.dy };
        return equal({ x: end.x, y: end.y }, target);
      });

      return move ?? null;
    },
  },
  reducers: {
    move(state, action: PayloadAction<Move>) {
      const [beast] = state.turns;
      if (beast === undefined) {
        throw Error();
      }

      const card = state.cards[beast];
      if (card.piece === null) {
        throw Error();
      }

      const piece = state.pieces[card.piece];

      const start = state.coordinates[piece.coordinate];
      if (start === undefined) {
        throw Error();
      }

      const previous = Object.values(state.fields).find(({ coordinate: id }) => id === start.id);
      if (previous === undefined) {
        throw Error();
      }

      const target = { x: start.x + action.payload.dx, y: start.y + action.payload.dy };
      const coordinate = Object.values(state.coordinates).find(({ x, y }) => equal({ x, y }, target));
      if (coordinate === undefined) {
        throw Error();
      }

      const next = Object.values(state.fields).find(({ coordinate: id }) => id === coordinate.id);
      if (next === undefined) {
        throw Error();
      }

      previous.piece = null;
      next.piece = piece.id;
      piece.coordinate = coordinate.id;
    },
  },
});
