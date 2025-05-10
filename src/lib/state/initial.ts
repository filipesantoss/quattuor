import type { Game } from "&/entity/game";
import { Elements } from "&/entity/idol";
import { Beasts } from "&/entity/shape";
import equal from "fast-deep-equal";

export const SIDE = 9;

const coordinates: Game["coordinates"] = Object.fromEntries(
  Array.from({ length: SIDE * SIDE }).map((_, index) => {
    const id = index.toString();
    const remainder = index % SIDE;
    const quotient = (index - remainder) / SIDE;
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
    claimed: false,
  },
  [Elements.Water]: {
    id: Elements.Water,
    coordinate: Object.keys(coordinates).at(SIDE - 2) as string,
    claimed: false,
  },
  [Elements.Earth]: {
    id: Elements.Earth,
    coordinate: Object.keys(coordinates).at(SIDE * SIDE - SIDE - SIDE) as string,
    claimed: false,
  },
  [Elements.Wind]: {
    id: Elements.Wind,
    coordinate: Object.keys(coordinates).at(SIDE * SIDE - 1 - SIDE) as string,
    claimed: false,
  },
};

const fields: Game["fields"] = Object.fromEntries(
  Object.keys(coordinates).map((id) => {
    const idol = Object.values(idols).find((idol) => equal(idol.coordinate, id));
    const shrine = Object.values(shrines).find((shrine) => equal(shrine.coordinate, id));
    return [id, { id, coordinate: id, occupier: idol?.id ?? null, shrine: shrine?.id ?? null, influencer: null }];
  }),
);

const shapes: Game["shapes"] = {
  [Beasts.Tiger]: {
    id: Beasts.Tiger,
    master: null,
    movements: [
      { dy: -2, dx: 0 },
      { dy: -1, dx: 0 },
    ],
  },
  [Beasts.Dragon]: {
    id: Beasts.Dragon,
    master: null,
    movements: [
      { dy: -1, dx: -2 },
      { dy: -1, dx: 2 },
      { dy: 1, dx: -1 },
      { dy: 1, dx: 1 },
    ],
  },
  [Beasts.Frog]: {
    id: Beasts.Frog,
    master: Elements.Wind,
    movements: [
      { dy: 0, dx: -2 },
      { dy: -1, dx: -1 },
      { dy: 1, dx: 1 },
    ],
  },
  [Beasts.Rabbit]: {
    id: Beasts.Rabbit,
    master: Elements.Earth,
    movements: [
      { dy: 1, dx: -1 },
      { dy: -1, dx: 1 },
      { dy: 0, dx: 2 },
    ],
  },
  [Beasts.Crab]: {
    id: Beasts.Crab,
    master: null,
    movements: [
      { dy: 0, dx: -2 },
      { dy: 0, dx: 2 },
      { dy: -1, dx: 0 },
    ],
  },
  [Beasts.Elephant]: {
    id: Beasts.Elephant,
    master: null,
    movements: [
      { dy: -1, dx: -1 },
      { dy: 0, dx: -1 },
      { dy: -1, dx: 1 },
      { dy: 0, dx: 1 },
    ],
  },
  [Beasts.Goose]: {
    id: Beasts.Goose,
    master: Elements.Wind,
    movements: [
      { dy: -1, dx: -1 },
      { dy: 0, dx: -1 },
      { dy: 0, dx: 1 },
      { dy: 1, dx: 1 },
    ],
  },
  [Beasts.Rooster]: {
    id: Beasts.Rooster,
    master: Elements.Earth,
    movements: [
      { dy: 0, dx: -1 },
      { dy: 1, dx: -1 },
      { dy: 0, dx: 1 },
      { dy: -1, dx: 1 },
    ],
  },
  [Beasts.Monkey]: {
    id: Beasts.Monkey,
    master: null,
    movements: [
      { dy: -1, dx: -1 },
      { dy: 1, dx: -1 },
      { dy: -1, dx: 1 },
      { dy: 1, dx: 1 },
    ],
  },
  [Beasts.Mantis]: {
    id: Beasts.Mantis,
    master: null,
    movements: [
      { dy: -1, dx: -1 },
      { dy: -1, dx: 1 },
      { dy: 1, dx: 0 },
    ],
  },
  [Beasts.Horse]: {
    id: Beasts.Horse,
    master: Elements.Water,
    movements: [
      { dy: 0, dx: -1 },
      { dy: 1, dx: 0 },
      { dy: -1, dx: 0 },
    ],
  },
  [Beasts.Ox]: {
    id: Beasts.Ox,
    master: Elements.Fire,
    movements: [
      { dy: -1, dx: 0 },
      { dy: 1, dx: 0 },
      { dy: 0, dx: 1 },
    ],
  },
  [Beasts.Crane]: {
    id: Beasts.Crane,
    master: null,
    movements: [
      { dy: 1, dx: -1 },
      { dy: 1, dx: 1 },
      { dy: -1, dx: 0 },
    ],
  },
  [Beasts.Boar]: {
    id: Beasts.Boar,
    master: null,
    movements: [
      { dy: 0, dx: -1 },
      { dy: 0, dx: 1 },
      { dy: -1, dx: 0 },
    ],
  },
  [Beasts.Eel]: {
    id: Beasts.Eel,
    master: Elements.Fire,
    movements: [
      { dy: -1, dx: -1 },
      { dy: 1, dx: -1 },
      { dy: 0, dx: 1 },
    ],
  },
  [Beasts.Cobra]: {
    id: Beasts.Cobra,
    master: Elements.Water,
    movements: [
      { dy: 0, dx: -1 },
      { dy: -1, dx: 1 },
      { dy: 1, dx: 1 },
    ],
  },
};

const sequence: Game["sequence"] = [
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
  idols,
  shapes,
  sequence,
  shrines,
};
