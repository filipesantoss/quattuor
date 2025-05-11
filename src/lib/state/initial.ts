import type { Game } from "&/entity/game";
import type { Idol } from "&/entity/idol";
import { Elements } from "&/entity/idol";
import type { Beast } from "&/entity/spirit";
import { Creatures } from "&/entity/spirit";
import { ulid } from "ulid";

export const SIDE = 9;

const _idols: Record<string, Idol["id"]> = {
  [`${0}`]: Elements.Fire,
  [`${SIDE - 1}`]: Elements.Water,
  [`${SIDE * SIDE - SIDE}`]: Elements.Earth,
  [`${SIDE * SIDE - 1}`]: Elements.Wind,
};

const _shrines: Record<string, Idol["id"]> = {
  [`${1}`]: Elements.Fire,
  [`${SIDE - 2}`]: Elements.Water,
  [`${SIDE * SIDE - SIDE - SIDE}`]: Elements.Earth,
  [`${SIDE * SIDE - 1 - SIDE}`]: Elements.Wind,
};

const fields: Game["fields"] = Object.fromEntries(
  Array.from({ length: SIDE * SIDE }).map((_, index) => {
    const id = ulid();
    const x = index % SIDE;
    const y = (index - x) / SIDE;
    const occupier = _idols[index] ?? null;
    const shrine = _shrines[index] ?? null;
    const influencer = null;
    return [id, { id, x, y, occupier, shrine, influencer }];
  }),
);

const idols: Game["idols"] = {
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
};

const shrines: Game["shrines"] = {
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
};

const _beasts: Record<Creatures, Beast> = {
  [Creatures.Tiger]: {
    id: Creatures.Tiger,
    movements: [
      { dy: -2, dx: 0 },
      { dy: -1, dx: 0 },
    ],
  },
  [Creatures.Dragon]: {
    id: Creatures.Dragon,
    movements: [
      { dy: -1, dx: -2 },
      { dy: -1, dx: 2 },
      { dy: 1, dx: -1 },
      { dy: 1, dx: 1 },
    ],
  },
  [Creatures.Frog]: {
    id: Creatures.Frog,
    movements: [
      { dy: 0, dx: -2 },
      { dy: -1, dx: -1 },
      { dy: 1, dx: 1 },
    ],
  },
  [Creatures.Rabbit]: {
    id: Creatures.Rabbit,
    movements: [
      { dy: 1, dx: -1 },
      { dy: -1, dx: 1 },
      { dy: 0, dx: 2 },
    ],
  },
  [Creatures.Crab]: {
    id: Creatures.Crab,
    movements: [
      { dy: 0, dx: -2 },
      { dy: 0, dx: 2 },
      { dy: -1, dx: 0 },
    ],
  },
  [Creatures.Elephant]: {
    id: Creatures.Elephant,
    movements: [
      { dy: -1, dx: -1 },
      { dy: 0, dx: -1 },
      { dy: -1, dx: 1 },
      { dy: 0, dx: 1 },
    ],
  },
  [Creatures.Goose]: {
    id: Creatures.Goose,
    movements: [
      { dy: -1, dx: -1 },
      { dy: 0, dx: -1 },
      { dy: 0, dx: 1 },
      { dy: 1, dx: 1 },
    ],
  },
  [Creatures.Rooster]: {
    id: Creatures.Rooster,
    movements: [
      { dy: 0, dx: -1 },
      { dy: 1, dx: -1 },
      { dy: 0, dx: 1 },
      { dy: -1, dx: 1 },
    ],
  },
  [Creatures.Monkey]: {
    id: Creatures.Monkey,
    movements: [
      { dy: -1, dx: -1 },
      { dy: 1, dx: -1 },
      { dy: -1, dx: 1 },
      { dy: 1, dx: 1 },
    ],
  },
  [Creatures.Mantis]: {
    id: Creatures.Mantis,
    movements: [
      { dy: -1, dx: -1 },
      { dy: -1, dx: 1 },
      { dy: 1, dx: 0 },
    ],
  },
  [Creatures.Horse]: {
    id: Creatures.Horse,
    movements: [
      { dy: 0, dx: -1 },
      { dy: 1, dx: 0 },
      { dy: -1, dx: 0 },
    ],
  },
  [Creatures.Ox]: {
    id: Creatures.Ox,
    movements: [
      { dy: -1, dx: 0 },
      { dy: 1, dx: 0 },
      { dy: 0, dx: 1 },
    ],
  },
  [Creatures.Crane]: {
    id: Creatures.Crane,
    movements: [
      { dy: 1, dx: -1 },
      { dy: 1, dx: 1 },
      { dy: -1, dx: 0 },
    ],
  },
  [Creatures.Boar]: {
    id: Creatures.Boar,
    movements: [
      { dy: 0, dx: -1 },
      { dy: 0, dx: 1 },
      { dy: -1, dx: 0 },
    ],
  },
  [Creatures.Eel]: {
    id: Creatures.Eel,
    movements: [
      { dy: -1, dx: -1 },
      { dy: 1, dx: -1 },
      { dy: 0, dx: 1 },
    ],
  },
  [Creatures.Cobra]: {
    id: Creatures.Cobra,
    movements: [
      { dy: 0, dx: -1 },
      { dy: -1, dx: 1 },
      { dy: 1, dx: 1 },
    ],
  },
};

const spirits: Game["spirits"] = {
  [Creatures.Ox]: { ..._beasts[Creatures.Ox], master: Elements.Fire },
  [Creatures.Eel]: { ..._beasts[Creatures.Eel], master: Elements.Fire },
  [Creatures.Horse]: { ..._beasts[Creatures.Horse], master: Elements.Water },
  [Creatures.Cobra]: { ..._beasts[Creatures.Cobra], master: Elements.Water },
  [Creatures.Rabbit]: { ..._beasts[Creatures.Rabbit], master: Elements.Earth },
  [Creatures.Rooster]: { ..._beasts[Creatures.Rooster], master: Elements.Earth },
  [Creatures.Frog]: { ..._beasts[Creatures.Frog], master: Elements.Wind },
  [Creatures.Goose]: { ..._beasts[Creatures.Goose], master: Elements.Wind },
};

const sequence: Game["sequence"] = [
  Creatures.Ox,
  Creatures.Horse,
  Creatures.Rooster,
  Creatures.Frog,
  Creatures.Eel,
  Creatures.Cobra,
  Creatures.Rabbit,
  Creatures.Goose,
];

export const initial: Game = {
  fields,
  idols,
  spirits,
  sequence,
  shrines,
};
