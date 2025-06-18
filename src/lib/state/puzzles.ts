import { assert } from "&/assert";
import data from "&/puzzle/data.json";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export const { reducer, selectors, actions } = createSlice({
  name: "puzzles",
  initialState: Object.fromEntries(data.map((game) => [game, { active: false, beaten: false }])),
  selectors: {
    unbeaten(state): string[] {
      return Object.keys(state).filter((game) => {
        assert(state[game] !== undefined);
        return !state[game].beaten;
      });
    },
  },
  reducers: {
    activate(state, action: PayloadAction<string>) {
      const active = Object.values(state).find((puzzle) => puzzle.active);
      assert(active === undefined);

      const puzzle = state[action.payload];
      assert(puzzle !== undefined);
      puzzle.active = true;
    },
    win(state) {
      const puzzle = Object.values(state).find((puzzle) => puzzle.active);
      assert(puzzle !== undefined);

      puzzle.beaten = true;
      puzzle.active = false;
    },
    lose(state) {
      const puzzle = Object.values(state).find((puzzle) => puzzle.active);
      assert(puzzle !== undefined);

      puzzle.active = false;
    },
  },
});
