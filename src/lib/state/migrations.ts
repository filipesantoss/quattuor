import data from "&/puzzle/data.json";
import { initial } from "&/state/initial";
import type { MigrationManifest } from "redux-persist";

export const manifest = {
  "1": (state) => {
    if (state === undefined) {
      return state;
    }

    return {
      ...state,
      puzzles: Object.fromEntries(data.slice(0, 30).map((game) => [game, { active: false, beaten: false }])),
      game: initial,
    };
  },
} satisfies MigrationManifest;
