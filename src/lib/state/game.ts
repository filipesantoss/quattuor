import type { Coordinate } from "&/state/entity/coordinate";
import type { Field } from "&/state/entity/field";
import type { Piece } from "&/state/entity/piece";
import { initial } from "&/state/initial";
import { createSlice } from "@reduxjs/toolkit";

export const { reducer, selectors } = createSlice({
  name: "game",
  initialState: initial,
  selectors: {
    fieldByFieldId(state, id: Field["id"]): Field | null {
      return state.fields[id] ?? null;
    },
    pieceByPieceId(state, id: Piece["id"]): Piece | null {
      return state.pieces[id] ?? null;
    },
    pieceByCoordinateId(state, id: Coordinate["id"]): Piece | null {
      return Object.values(state.pieces).find((piece) => piece.coordinate === id) ?? null;
    },
  },
  reducers: {},
});
