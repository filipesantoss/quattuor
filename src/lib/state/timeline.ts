import { assert } from "&/assert";
import { encode } from "&/encoding";
import type { Game } from "&/entity/game";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export const { reducer, actions } = createSlice({
  name: "timeline",
  initialState: [] as string[],
  reducers: {
    reset(state, action: PayloadAction<Game>) {
      state.length = 0;

      const entry = encode(action.payload);
      state.push(entry);
    },
    add(state, action: PayloadAction<Game>): void {
      const entry = encode(action.payload);
      state.push(entry);
    },
    rewind(state): void {
      assert(state.length > 1);
      state.pop();
    },
  },
});
