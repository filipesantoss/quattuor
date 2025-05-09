import type { Move } from "&/entity/card";
import type { Field } from "&/entity/field";
import { Elements, type Idol } from "&/entity/idol";
import type { Shrine } from "&/entity/shrine";
import { initial } from "&/state/initial";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import equal from "fast-deep-equal";

export const { reducer, selectors, actions } = createSlice({
  name: "game",
  initialState: initial,
  selectors: {
    idolByFieldId(state, id: Field["id"]): Idol | null {
      const field = state.fields[id];
      if (field === undefined) {
        return null;
      }

      if (field.idol === null) {
        return null;
      }

      return state.idols[field.idol];
    },
    idolByCurrentBeast(state): Idol {
      const [beast] = state.beasts;
      if (beast === undefined) {
        throw Error();
      }

      const card = state.cards[beast];
      if (card.idol === null) {
        throw Error();
      }

      return state.idols[card.idol];
    },
    moveByFieldId(state, id: Field["id"]): Move | null {
      const field = state.fields[id];
      if (field === undefined) {
        return null;
      }

      const [beast] = state.beasts;
      if (beast === undefined) {
        return null;
      }

      const card = state.cards[beast];
      if (card.idol === null) {
        throw Error();
      }

      const idol = state.idols[card.idol];

      const start = state.coordinates[idol.coordinate];
      if (start === undefined) {
        throw Error();
      }

      const end = state.coordinates[field.coordinate];
      if (end === undefined) {
        throw Error();
      }

      const move = card.moves.find((move) => {
        const target = { x: start.x + move.dx, y: start.y + move.dy };

        if (!equal({ x: end.x, y: end.y }, target)) {
          return false;
        }

        const future = Object.values(state.fields).find(({ coordinate: id }) => id === end.id);
        if (future === undefined) {
          throw Error();
        }

        if (future.idol !== null) {
          return false;
        }

        if (idol.id === Elements.Earth && future.influence === Elements.Wind) {
          return false;
        }

        if (idol.id === Elements.Wind && future.influence === Elements.Fire) {
          return false;
        }

        if (idol.id === Elements.Fire && future.influence === Elements.Water) {
          return false;
        }

        if (idol.id === Elements.Water && future.influence === Elements.Earth) {
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
    move(state, action: PayloadAction<Move>) {
      const [beast, ...beasts] = state.beasts;
      if (beast === undefined) {
        throw Error();
      }

      const card = state.cards[beast];
      if (card.idol === null) {
        throw Error();
      }

      const idol = state.idols[card.idol];

      const start = state.coordinates[idol.coordinate];
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

      if (next.idol !== null) {
        throw Error();
      }

      if (idol.id === Elements.Earth && next.influence === Elements.Wind) {
        throw Error();
      }

      if (idol.id === Elements.Wind && next.influence === Elements.Fire) {
        throw Error();
      }

      if (idol.id === Elements.Fire && next.influence === Elements.Water) {
        throw Error();
      }

      if (idol.id === Elements.Water && next.influence === Elements.Earth) {
        throw Error();
      }

      previous.idol = null;
      idol.coordinate = end.id;
      next.idol = idol.id;

      if (idol.id === Elements.Wind && next.influence === Elements.Earth) {
        next.influence = null;
      } else if (idol.id === Elements.Fire && next.influence === Elements.Wind) {
        next.influence = null;
      } else if (idol.id === Elements.Water && next.influence === Elements.Fire) {
        next.influence = null;
      } else if (idol.id === Elements.Earth && next.influence === Elements.Water) {
        next.influence = null;
      }

      if (next.shrine === null && next.influence !== null && previous.influence === next.influence) {
        return;
      }

      next.influence = idol.id;
      if (next.shrine === null) {
        state.beasts = [...beasts, beast];
        return;
      }

      const shrine = state.shrines[next.shrine];
      for (const beast of state.beasts) {
        const card = state.cards[beast];
        if (card.idol !== idol.id) {
          continue;
        }

        card.idol = null;
        state.beasts = state.beasts.filter((beast) => beast !== card.id);
        shrine.idol = idol.id;
      }
    },
  },
});
