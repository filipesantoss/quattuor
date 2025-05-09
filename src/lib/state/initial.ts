import { Beasts } from "&/state/entity/card";
import type { State } from "&/state/entity/game";
import { Elements } from "&/state/entity/piece";
import { ulid } from "ulid";

export const SIDE = 9;

const coordinates: State["coordinates"] = Object.fromEntries(
  Array.from({ length: SIDE * SIDE }).map((_, i) => {
    const id = ulid();
    const remainder = i % SIDE;
    const quotient = (i - remainder) / SIDE;
    return [id, { id, x: remainder, y: quotient }];
  }),
);

const fields: State["fields"] = Object.fromEntries(
  Object.keys(coordinates).map((coordinate) => {
    const id = ulid();
    return [id, { id, coordinate, piece: null }];
  }),
);

const pieces: State["pieces"] = {
  [Elements.Fire]: {
    id: Elements.Fire,
    coordinate: Object.keys(coordinates).at((SIDE * SIDE) / 2) as string,
  },
  [Elements.Water]: {
    id: Elements.Water,
    coordinate: Object.keys(coordinates).at(2) as string,
  },
  [Elements.Earth]: {
    id: Elements.Earth,
    coordinate: Object.keys(coordinates).at(1) as string,
  },
  [Elements.Wind]: {
    id: Elements.Wind,
    coordinate: Object.keys(coordinates).at(0) as string,
  },
};

const cards: State["cards"] = {
  [Beasts.Tiger]: {
    id: Beasts.Tiger,
    piece: Elements.Fire,
    moves: [
      { dy: -2, dx: 0 },
      { dy: -1, dx: 0 },
    ],
  },
  [Beasts.Dragon]: {
    id: Beasts.Dragon,
    piece: Elements.Fire,
    moves: [
      { dy: -1, dx: -2 },
      { dy: -1, dx: 2 },
      { dy: 1, dx: -1 },
      { dy: 1, dx: 1 },
    ],
  },
  [Beasts.Frog]: {
    id: Beasts.Frog,
    piece: Elements.Fire,
    moves: [
      { dy: 0, dx: -2 },
      { dy: -1, dx: -1 },
      { dy: 1, dx: 1 },
    ],
  },
  [Beasts.Rabbit]: {
    id: Beasts.Rabbit,
    piece: Elements.Fire,
    moves: [
      { dy: 1, dx: -1 },
      { dy: -1, dx: 1 },
      { dy: 0, dx: 2 },
    ],
  },
  [Beasts.Crab]: {
    id: Beasts.Crab,
    piece: Elements.Fire,
    moves: [
      { dy: 0, dx: -2 },
      { dy: 0, dx: 2 },
      { dy: -1, dx: 0 },
    ],
  },
  [Beasts.Elephant]: {
    id: Beasts.Elephant,
    piece: Elements.Fire,
    moves: [
      { dy: -1, dx: -1 },
      { dy: 0, dx: -1 },
      { dy: -1, dx: 1 },
      { dy: 0, dx: 1 },
    ],
  },
  [Beasts.Goose]: {
    id: Beasts.Goose,
    piece: Elements.Fire,
    moves: [
      { dy: -1, dx: -1 },
      { dy: 0, dx: -1 },
      { dy: 0, dx: 1 },
      { dy: 1, dx: 1 },
    ],
  },
  [Beasts.Rooster]: {
    id: Beasts.Rooster,
    piece: Elements.Fire,
    moves: [
      { dy: 0, dx: -1 },
      { dy: 1, dx: -1 },
      { dy: 0, dx: 1 },
      { dy: -1, dx: 1 },
    ],
  },
  [Beasts.Monkey]: {
    id: Beasts.Monkey,
    piece: Elements.Fire,
    moves: [
      { dy: -1, dx: -1 },
      { dy: 1, dx: -1 },
      { dy: -1, dx: 1 },
      { dy: 1, dx: 1 },
    ],
  },
  [Beasts.Mantis]: {
    id: Beasts.Mantis,
    piece: Elements.Fire,
    moves: [
      { dy: -1, dx: -1 },
      { dy: -1, dx: 1 },
      { dy: 1, dx: 0 },
    ],
  },
  [Beasts.Horse]: {
    id: Beasts.Horse,
    piece: Elements.Fire,
    moves: [
      { dy: 0, dx: -1 },
      { dy: 1, dx: 0 },
      { dy: -1, dx: 0 },
    ],
  },
  [Beasts.Ox]: {
    id: Beasts.Ox,
    piece: Elements.Fire,
    moves: [
      { dy: -1, dx: 0 },
      { dy: 1, dx: 0 },
      { dy: 0, dx: 1 },
    ],
  },
  [Beasts.Crane]: {
    id: Beasts.Crane,
    piece: Elements.Fire,
    moves: [
      { dy: 1, dx: -1 },
      { dy: 1, dx: 1 },
      { dy: -1, dx: 0 },
    ],
  },
  [Beasts.Boar]: {
    id: Beasts.Boar,
    piece: Elements.Fire,
    moves: [
      { dy: 0, dx: -1 },
      { dy: 0, dx: 1 },
      { dy: -1, dx: 0 },
    ],
  },
  [Beasts.Eel]: {
    id: Beasts.Eel,
    piece: Elements.Fire,
    moves: [
      { dy: -1, dx: -1 },
      { dy: 1, dx: -1 },
      { dy: 0, dx: 1 },
    ],
  },
  [Beasts.Cobra]: {
    id: Beasts.Cobra,
    piece: Elements.Fire,
    moves: [
      { dy: 0, dx: -1 },
      { dy: -1, dx: 1 },
      { dy: 1, dx: 1 },
    ],
  },
};

const turns: State["turns"] = [Beasts.Cobra];

export const initial: State = {
  coordinates,
  fields,
  pieces,
  cards,
  turns,
};
