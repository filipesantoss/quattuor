import type { Move } from "&/entity/card";
import type { Field } from "&/entity/field";
import type { Piece } from "&/entity/piece";
import type { Shrine } from "&/entity/shrine";
import { initial } from "&/state/initial";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import equal from "fast-deep-equal";

export const { reducer, selectors, actions } = createSlice({
  name: "game",
  initialState: initial,
  selectors: {
    pieceByFieldId(state, id: Field["id"]): Piece | null {
      const field = state.fields[id];
      if (field === undefined) {
        return null;
      }

      if (field.piece === null) {
        return null;
      }

      return state.pieces[field.piece];
    },
    isActiveElementByPieceId(state, id: Piece["id"]): boolean {
      const [beast] = state.beasts;
      if (beast === undefined) {
        throw Error();
      }

      const card = state.cards[beast];
      if (card.piece === null) {
        throw Error();
      }

      return card.piece === id;
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

      const [beast] = state.beasts;
      if (beast === undefined) {
        return null;
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
    shrineByFieldId(state, id: Field["id"]): Shrine | null {
      const field = state.fields[id];
      if (field === undefined) {
        return null;
      }

      if (field.shrine === null) {
        return null;
      }

      return state.shrines[field.shrine];
    },
  },
  reducers: {
    move(state, action: PayloadAction<Move>) {
      const [beast, ...beasts] = state.beasts;
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
      const end = Object.values(state.coordinates).find(({ x, y }) => equal({ x, y }, target));
      if (end === undefined) {
        throw Error();
      }

      const next = Object.values(state.fields).find(({ coordinate: id }) => id === end.id);
      if (next === undefined) {
        throw Error();
      }

      if (next.piece !== null) {
        throw Error();
      }

      previous.piece = null;
      piece.coordinate = end.id;
      next.piece = piece.id;

      if (next.shrine === null) {
        state.beasts = [...beasts, beast];
        return;
      }

      const shrine = state.shrines[next.shrine];
      for (const beast of state.beasts) {
        const card = state.cards[beast];
        if (card.piece !== piece.id) {
          continue;
        }

        card.piece = null;
        state.beasts = state.beasts.filter((beast) => beast !== card.id);
        shrine.piece = piece.id;
      }
    },
  },
});
