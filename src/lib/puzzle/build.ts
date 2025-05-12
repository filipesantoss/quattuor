import { assert } from "&/assert";
import { abandon, enter } from "&/entity/field";
import type { Game } from "&/entity/game";
import { Elements } from "&/entity/idol";
import { shuffle } from "fast-shuffle";
import clone from "nanoclone";
import { ulid } from "ulid";
import { beastiary } from "./bestiary";

export const SIDE = 9;

export function build(): Game {
  const game = clone(skeleton);
  const fields = shuffle(Object.values(game.fields));

  const shrines = shuffle(Object.values(game.shrines));
  const ends = fields.slice(0, shrines.length);
  assert(ends.length === shrines.length);
  for (let index = 0; index < ends.length; index++) {
    const field = ends[index];
    assert(field !== undefined);
    const shrine = shrines[index];
    assert(shrine !== undefined);

    abandon.call(field, shrine);
  }

  const idols = shuffle(Object.values(game.idols));
  const starts = fields.slice(shrines.length, shrines.length + idols.length);
  assert(starts.length === idols.length);
  for (let index = 0; index < ends.length; index++) {
    const field = starts[index];
    assert(field !== undefined);
    const idol = idols[index];
    assert(idol !== undefined);

    enter.call(field, idol);
  }

  const beasts = shuffle(Object.values(beastiary));
  const turns = idols.length * 2;
  assert(beasts.length >= turns);
  for (let index = 0; index < turns; index++) {
    const beast = beasts[index];
    assert(beast !== undefined);
    const idol = idols[index % (turns / idols.length)];
    assert(idol !== undefined);

    game.sequence = [...game.sequence, beast.id];
    game.spirits[beast.id] = { ...beast, master: idol.id };
  }

  // TODO: validate solution.

  return game;
}

const skeleton: Game = {
  fields: Object.fromEntries(
    Array.from({ length: SIDE * SIDE }).map((_, index) => {
      const id = ulid();
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
