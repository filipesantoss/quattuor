import { assert } from "&/assert";
import type { Field } from "&/entity/field";
import { hosts, matches, offset } from "&/entity/field";
import type { Game } from "&/entity/game";
import { scan, step } from "&/entity/game";
import type { Idol } from "&/entity/idol";
import type { Shrine } from "&/entity/shrine";
import type { Movement } from "&/entity/spirit";
import { create } from "&/puzzle/create";
import { initial } from "&/state/initial";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import equal from "fast-deep-equal";

export const { reducer, selectors, actions } = createSlice({
  name: "game",
  initialState: initial,
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
    movementByTargetFieldId(state, id: Field["id"]): Movement | null {
      const field = state.fields[id];
      assert(field !== undefined);

      const options = scan.call(state);
      if (options.length === 0) {
        return null;
      }

      const [creature] = state.sequence;
      assert(creature !== undefined);

      const spirit = state.spirits[creature];
      assert(spirit !== undefined);

      const idol = state.idols[spirit.master];
      const from = Object.values(state.fields).find((field) => hosts.call(field, idol));
      assert(from !== undefined);

      const necessary = options.find((movement) => {
        const target = offset.call(from, movement);
        const to = Object.values(state.fields).find((field) => matches.call(field, target));
        assert(to !== undefined);
        return to.id === field.id;
      });

      return necessary ?? null;
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
    init(state) {
      if (!equal(state, initial)) {
        return;
      }

      Object.assign(state, create());
    },
    move(state, action: PayloadAction<Movement>) {
      step.call(state, action.payload);
    },
    load(state, action: PayloadAction<Game>) {
      Object.assign(state, action.payload);
    },
  },
});
