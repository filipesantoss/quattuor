import data from "&/puzzle/data.json";
import type { MigrationManifest } from "redux-persist";

export const manifest = {
  "1": (state) => {
    if (state === undefined) {
      return state;
    }

    return {
      ...state,
      puzzles: data.slice(0, 30).map((game) => ({ active: false, beaten: false, game })),
    };
  },
} satisfies MigrationManifest;
