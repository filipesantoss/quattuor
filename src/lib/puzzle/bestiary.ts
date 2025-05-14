import type { Beast } from "&/entity/spirit";
import { Creatures } from "&/entity/spirit";

export const beastiary: Record<Creatures, Beast> = {
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
