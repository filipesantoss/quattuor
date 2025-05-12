import { assert } from "&/assert";
import type { Field } from "&/entity/field";
import { scan, step } from "&/entity/game";
import type { Idol } from "&/entity/idol";
import type { Shrine } from "&/entity/shrine";
import type { Movement } from "&/entity/spirit";
import { build } from "&/puzzle/build";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export const { reducer, selectors, actions } = createSlice({
  name: "game",
  initialState: build(),
  selectors: {
    occupierByFieldId(state, id: Field["id"]): Idol | null {
      const field = state.fields[id];
      assert(field !== undefined);

      if (field.occupier === null) {
        return null;
      }

      return state.idols[field.occupier];
    },
    idolByActiveCreature(state): Idol {
      const [creature] = state.sequence;
      assert(creature !== undefined);

      const spirit = state.spirits[creature];
      assert(spirit !== undefined);

      return state.idols[spirit.master];
    },
    movementByFieldId(state, id: Field["id"]): Movement | null {
      const field = state.fields[id];
      assert(field !== undefined);

      const [movement] = scan.call(state, field);
      return movement ?? null;
    },
    shrineByFieldId(state, id: Field["id"]): Shrine | null {
      const field = state.fields[id];
      assert(field !== undefined);

      if (field.shrine === null) {
        return null;
      }

      return state.shrines[field.shrine];
    },
  },
  reducers: {
    move(state, action: PayloadAction<Movement>) {
      step.call(state, action.payload);
    },
  },
});
