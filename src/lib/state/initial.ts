import { Beasts } from "&/entity/card";
import type { Game } from "&/entity/game";
import { Elements } from "&/entity/idol";
import equal from "fast-deep-equal";
import { ulid } from "ulid";

export const SIDE = 9;

const coordinates: Game["coordinates"] = Object.fromEntries(
  Array.from({ length: SIDE * SIDE }).map((_, i) => {
    const id = ulid();
    const remainder = i % SIDE;
    const quotient = (i - remainder) / SIDE;
    return [id, { id, x: remainder, y: quotient }];
  }),
);

const idols: Game["idols"] = {
  [Elements.Fire]: {
    id: Elements.Fire,
    coordinate: Object.keys(coordinates).at(0) as string,
  },
  [Elements.Water]: {
    id: Elements.Water,
    coordinate: Object.keys(coordinates).at(SIDE - 1) as string,
  },
  [Elements.Earth]: {
    id: Elements.Earth,
    coordinate: Object.keys(coordinates).at(SIDE * SIDE - SIDE) as string,
  },
  [Elements.Wind]: {
    id: Elements.Wind,
    coordinate: Object.keys(coordinates).at(SIDE * SIDE - 1) as string,
  },
};

const shrines: Game["shrines"] = {
  [Elements.Fire]: {
    id: Elements.Fire,
    coordinate: Object.keys(coordinates).at(1) as string,
    idol: null,
  },
  [Elements.Water]: {
    id: Elements.Water,
    coordinate: Object.keys(coordinates).at(SIDE - 2) as string,
    idol: null,
  },
  [Elements.Earth]: {
    id: Elements.Earth,
    coordinate: Object.keys(coordinates).at(SIDE * SIDE - SIDE - SIDE) as string,
    idol: null,
  },
  [Elements.Wind]: {
    id: Elements.Wind,
    coordinate: Object.keys(coordinates).at(SIDE * SIDE - 1 - SIDE) as string,
    idol: null,
  },
};

const fields: Game["fields"] = Object.fromEntries(
  Object.keys(coordinates).map((coordinate) => {
    const id = ulid();
    const idol = Object.values(idols).find((idol) => equal(idol.coordinate, coordinate));
    const shrine = Object.values(shrines).find((shrine) => equal(shrine.coordinate, coordinate));
    return [id, { id, coordinate, idol: idol?.id ?? null, shrine: shrine?.id ?? null }];
  }),
);

const cards: Game["cards"] = {
  [Beasts.Tiger]: {
    id: Beasts.Tiger,
    idol: null,
    moves: [
      { dy: -2, dx: 0 },
      { dy: -1, dx: 0 },
    ],
  },
  [Beasts.Dragon]: {
    id: Beasts.Dragon,
    idol: null,
    moves: [
      { dy: -1, dx: -2 },
      { dy: -1, dx: 2 },
      { dy: 1, dx: -1 },
      { dy: 1, dx: 1 },
    ],
  },
  [Beasts.Frog]: {
    id: Beasts.Frog,
    idol: Elements.Wind,
    moves: [
      { dy: 0, dx: -2 },
      { dy: -1, dx: -1 },
      { dy: 1, dx: 1 },
    ],
  },
  [Beasts.Rabbit]: {
    id: Beasts.Rabbit,
    idol: Elements.Earth,
    moves: [
      { dy: 1, dx: -1 },
      { dy: -1, dx: 1 },
      { dy: 0, dx: 2 },
    ],
  },
  [Beasts.Crab]: {
    id: Beasts.Crab,
    idol: null,
    moves: [
      { dy: 0, dx: -2 },
      { dy: 0, dx: 2 },
      { dy: -1, dx: 0 },
    ],
  },
  [Beasts.Elephant]: {
    id: Beasts.Elephant,
    idol: null,
    moves: [
      { dy: -1, dx: -1 },
      { dy: 0, dx: -1 },
      { dy: -1, dx: 1 },
      { dy: 0, dx: 1 },
    ],
  },
  [Beasts.Goose]: {
    id: Beasts.Goose,
    idol: Elements.Wind,
    moves: [
      { dy: -1, dx: -1 },
      { dy: 0, dx: -1 },
      { dy: 0, dx: 1 },
      { dy: 1, dx: 1 },
    ],
  },
  [Beasts.Rooster]: {
    id: Beasts.Rooster,
    idol: Elements.Earth,
    moves: [
      { dy: 0, dx: -1 },
      { dy: 1, dx: -1 },
      { dy: 0, dx: 1 },
      { dy: -1, dx: 1 },
    ],
  },
  [Beasts.Monkey]: {
    id: Beasts.Monkey,
    idol: null,
    moves: [
      { dy: -1, dx: -1 },
      { dy: 1, dx: -1 },
      { dy: -1, dx: 1 },
      { dy: 1, dx: 1 },
    ],
  },
  [Beasts.Mantis]: {
    id: Beasts.Mantis,
    idol: null,
    moves: [
      { dy: -1, dx: -1 },
      { dy: -1, dx: 1 },
      { dy: 1, dx: 0 },
    ],
  },
  [Beasts.Horse]: {
    id: Beasts.Horse,
    idol: Elements.Water,
    moves: [
      { dy: 0, dx: -1 },
      { dy: 1, dx: 0 },
      { dy: -1, dx: 0 },
    ],
  },
  [Beasts.Ox]: {
    id: Beasts.Ox,
    idol: Elements.Fire,
    moves: [
      { dy: -1, dx: 0 },
      { dy: 1, dx: 0 },
      { dy: 0, dx: 1 },
    ],
  },
  [Beasts.Crane]: {
    id: Beasts.Crane,
    idol: null,
    moves: [
      { dy: 1, dx: -1 },
      { dy: 1, dx: 1 },
      { dy: -1, dx: 0 },
    ],
  },
  [Beasts.Boar]: {
    id: Beasts.Boar,
    idol: null,
    moves: [
      { dy: 0, dx: -1 },
      { dy: 0, dx: 1 },
      { dy: -1, dx: 0 },
    ],
  },
  [Beasts.Eel]: {
    id: Beasts.Eel,
    idol: Elements.Fire,
    moves: [
      { dy: -1, dx: -1 },
      { dy: 1, dx: -1 },
      { dy: 0, dx: 1 },
    ],
  },
  [Beasts.Cobra]: {
    id: Beasts.Cobra,
    idol: Elements.Water,
    moves: [
      { dy: 0, dx: -1 },
      { dy: -1, dx: 1 },
      { dy: 1, dx: 1 },
    ],
  },
};

const turns: Game["beasts"] = [
  Beasts.Ox,
  Beasts.Horse,
  Beasts.Rooster,
  Beasts.Frog,
  Beasts.Eel,
  Beasts.Cobra,
  Beasts.Rabbit,
  Beasts.Goose,
];

export const initial: Game = {
  coordinates,
  fields,
  idols: idols,
  cards,
  beasts: turns,
  shrines,
};
