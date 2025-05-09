import type { Coordinate } from "&/state/entity/coordinate";
import type { Field } from "&/state/entity/field";
import type { Piece } from "&/state/entity/piece";
import { Elements } from "&/state/entity/piece";
import { ulid } from "ulid";

interface State {
  coordinates: Record<Coordinate["id"], Coordinate>;
  fields: Record<Field["id"], Field>;
  pieces: Record<Piece["id"], Piece>;
}

export const SIDE = 8;

const coordinates: State["coordinates"] = Object.fromEntries(
  Array.from({ length: SIDE * SIDE }).map((_, i) => {
    const id = ulid();
    const remainder = i % SIDE;
    const quotient = (i - remainder) / SIDE;
    return [id, { id, x: quotient, y: remainder }];
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

export const initial: State = {
  coordinates,
  fields,
  pieces,
};
