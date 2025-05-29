import type { Game } from "&/entity/game";
import { Elements } from "&/entity/idol";

export const SIDE = 9;

export const initial: Game = {
  fields: Object.fromEntries(
    Array.from({ length: SIDE * SIDE }).map((_, index) => {
      const id = index;
      const x = index % SIDE;
      const y = (index - x) / SIDE;
      return [id, { id, x, y, occupier: null, shrine: null, influencer: null }];
    }),
  ),
  idols: {
    [Elements.Fire]: {
      id: Elements.Fire,
    },
    [Elements.Water]: {
      id: Elements.Water,
    },
    [Elements.Earth]: {
      id: Elements.Earth,
    },
    [Elements.Wind]: {
      id: Elements.Wind,
    },
  },
  shrines: {
    [Elements.Fire]: {
      id: Elements.Fire,
      claimed: false,
    },
    [Elements.Water]: {
      id: Elements.Water,
      claimed: false,
    },
    [Elements.Earth]: {
      id: Elements.Earth,
      claimed: false,
    },
    [Elements.Wind]: {
      id: Elements.Wind,
      claimed: false,
    },
  },
  spirits: {
    // Must be populated.
  },
  sequence: [
    // Must be populated.
  ],
};
