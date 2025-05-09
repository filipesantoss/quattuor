import type { Card } from "&/state/entity/card";
import { Beasts } from "&/state/entity/card";
import type { Coordinate } from "&/state/entity/coordinate";
import type { Field } from "&/state/entity/field";
import type { Piece } from "&/state/entity/piece";
import { Elements } from "&/state/entity/piece";
import { ulid } from "ulid";

interface State {
  coordinates: Record<Coordinate["id"], Coordinate>;
  fields: Record<Field["id"], Field>;
  pieces: Record<Piece["id"], Piece>;
  cards: Record<Card["id"], Card>;
  turns: Card["id"][];
}

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
    piece: null,
    moves: [],
  },
  [Beasts.Frog]: {
    id: Beasts.Frog,
    piece: null,
    moves: [],
  },
  [Beasts.Rabbit]: {
    id: Beasts.Rabbit,
    piece: null,
    moves: [],
  },
  [Beasts.Crab]: {
    id: Beasts.Crab,
    piece: null,
    moves: [],
  },
  [Beasts.Elephant]: {
    id: Beasts.Elephant,
    piece: null,
    moves: [],
  },
  [Beasts.Goose]: {
    id: Beasts.Goose,
    piece: null,
    moves: [],
  },
  [Beasts.Rooster]: {
    id: Beasts.Rooster,
    piece: null,
    moves: [],
  },
  [Beasts.Monkey]: {
    id: Beasts.Monkey,
    piece: null,
    moves: [],
  },
  [Beasts.Mantis]: {
    id: Beasts.Mantis,
    piece: null,
    moves: [],
  },
  [Beasts.Horse]: {
    id: Beasts.Horse,
    piece: null,
    moves: [],
  },
  [Beasts.Ox]: {
    id: Beasts.Ox,
    piece: null,
    moves: [],
  },
  [Beasts.Crane]: {
    id: Beasts.Crane,
    piece: null,
    moves: [],
  },
  [Beasts.Boar]: {
    id: Beasts.Boar,
    piece: null,
    moves: [],
  },
  [Beasts.Eel]: {
    id: Beasts.Eel,
    piece: null,
    moves: [],
  },
  [Beasts.Cobra]: {
    id: Beasts.Cobra,
    piece: null,
    moves: [],
  },
};

const turns: State["turns"] = [Beasts.Tiger];

export const initial: State = {
  coordinates,
  fields,
  pieces,
  cards,
  turns,
};
