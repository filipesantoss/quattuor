import type { Field } from "&/entity/field";
import type { Idol } from "&/entity/idol";
import { Elements } from "&/entity/idol";
import type { Movement } from "&/entity/movement";
import type { Shrine } from "&/entity/shrine";
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
      if (field === undefined) {
        return null;
      }

      if (field.occupier === null) {
        return null;
      }

      return state.idols[field.occupier];
    },
    idolByActiveBeast(state): Idol {
      const [beast] = state.sequence;
      if (beast === undefined) {
        throw Error();
      }

      const shape = state.shapes[beast];
      if (shape.master === null) {
        throw Error();
      }

      return state.idols[shape.master];
    },
    moveByFieldId(state, id: Field["id"]): Movement | null {
      const field = state.fields[id];
      if (field === undefined) {
        return null;
      }

      const [beast] = state.sequence;
      if (beast === undefined) {
        return null;
      }

      const shape = state.shapes[beast];
      if (shape.master === null) {
        throw Error();
      }

      const idol = state.idols[shape.master];

      const start = state.coordinates[idol.coordinate];
      if (start === undefined) {
        throw Error();
      }

      const end = state.coordinates[field.id];
      if (end === undefined) {
        throw Error();
      }

      const move = shape.movements.find((move) => {
        const target = { x: start.x + move.dx, y: start.y + move.dy };

        if (!equal({ x: end.x, y: end.y }, target)) {
          return false;
        }

        const future = state.fields[end.id];
        if (future === undefined) {
          throw Error();
        }

        if (future.occupier !== null) {
          return false;
        }

        if (idol.id === Elements.Earth && future.influencer === Elements.Wind) {
          return false;
        }

        if (idol.id === Elements.Wind && future.influencer === Elements.Fire) {
          return false;
        }

        if (idol.id === Elements.Fire && future.influencer === Elements.Water) {
          return false;
        }

        if (idol.id === Elements.Water && future.influencer === Elements.Earth) {
          return false;
        }

        return true;
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
    move(state, action: PayloadAction<Movement>) {
      const [beast, ...beasts] = state.sequence;
      if (beast === undefined) {
        throw Error();
      }

      const shape = state.shapes[beast];
      if (shape.master === null) {
        throw Error();
      }

      const idol = state.idols[shape.master];

      const start = state.coordinates[idol.coordinate];
      if (start === undefined) {
        throw Error();
      }

      const previous = state.fields[start.id];
      if (previous === undefined) {
        throw Error();
      }

      const target = { x: start.x + action.payload.dx, y: start.y + action.payload.dy };
      const end = Object.values(state.coordinates).find(({ x, y }) => equal({ x, y }, target));
      if (end === undefined) {
        throw Error();
      }

      const next = state.fields[end.id];
      if (next === undefined) {
        throw Error();
      }

      if (next.occupier !== null) {
        throw Error();
      }

      if (idol.id === Elements.Earth && next.influencer === Elements.Wind) {
        throw Error();
      }

      if (idol.id === Elements.Wind && next.influencer === Elements.Fire) {
        throw Error();
      }

      if (idol.id === Elements.Fire && next.influencer === Elements.Water) {
        throw Error();
      }

      if (idol.id === Elements.Water && next.influencer === Elements.Earth) {
        throw Error();
      }

      previous.occupier = null;
      idol.coordinate = end.id;
      next.occupier = idol.id;

      if (idol.id === Elements.Wind && next.influencer === Elements.Earth) {
        next.influencer = null;
      } else if (idol.id === Elements.Fire && next.influencer === Elements.Wind) {
        next.influencer = null;
      } else if (idol.id === Elements.Water && next.influencer === Elements.Fire) {
        next.influencer = null;
      } else if (idol.id === Elements.Earth && next.influencer === Elements.Water) {
        next.influencer = null;
      }

      if (next.shrine === null && next.influencer !== null && previous.influencer === next.influencer) {
        return;
      }

      next.influencer = idol.id;
      if (next.shrine === null) {
        state.sequence = [...beasts, beast];
        return;
      }

      if (next.shrine !== idol.id) {
        throw Error();
      }

      for (const beast of state.sequence) {
        const shape = state.shapes[beast];
        if (shape.master !== idol.id) {
          continue;
        }

        state.sequence = state.sequence.filter((beast) => beast !== shape.id);
        state.shrines[next.shrine].claimed = true;
      }
    },
  },
});
