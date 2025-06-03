import type { Beast } from "&/entity/spirit";
import { Creatures } from "&/entity/spirit";

export const beastiary: Record<Creatures, Beast> = {
  [Creatures.Tiger]: {
    id: Creatures.Tiger,
    kanji: "虎",
    movements: [
      { dy: -2, dx: 0 },
      { dy: -1, dx: 0 },
    ],
  },
  [Creatures.Dragon]: {
    id: Creatures.Dragon,
    kanji: "竜",
    movements: [
      { dy: -1, dx: -2 },
      { dy: -1, dx: 2 },
      { dy: 1, dx: -1 },
      { dy: 1, dx: 1 },
    ],
  },
  [Creatures.Frog]: {
    id: Creatures.Frog,
    kanji: "蛙",
    movements: [
      { dy: 0, dx: -2 },
      { dy: -1, dx: -1 },
      { dy: 1, dx: 1 },
    ],
  },
  [Creatures.Rabbit]: {
    id: Creatures.Rabbit,
    kanji: "兎",
    movements: [
      { dy: 1, dx: -1 },
      { dy: -1, dx: 1 },
      { dy: 0, dx: 2 },
    ],
  },
  [Creatures.Crab]: {
    id: Creatures.Crab,
    kanji: "蟹",
    movements: [
      { dy: 0, dx: -2 },
      { dy: 0, dx: 2 },
      { dy: -1, dx: 0 },
    ],
  },
  [Creatures.Elephant]: {
    id: Creatures.Elephant,
    kanji: "象",
    movements: [
      { dy: -1, dx: -1 },
      { dy: 0, dx: -1 },
      { dy: -1, dx: 1 },
      { dy: 0, dx: 1 },
    ],
  },
  [Creatures.Goose]: {
    id: Creatures.Goose,
    kanji: "雁",
    movements: [
      { dy: -1, dx: -1 },
      { dy: 0, dx: -1 },
      { dy: 0, dx: 1 },
      { dy: 1, dx: 1 },
    ],
  },
  [Creatures.Rooster]: {
    id: Creatures.Rooster,
    kanji: "鶏",
    movements: [
      { dy: 0, dx: -1 },
      { dy: 1, dx: -1 },
      { dy: 0, dx: 1 },
      { dy: -1, dx: 1 },
    ],
  },
  [Creatures.Monkey]: {
    id: Creatures.Monkey,
    kanji: "猿",
    movements: [
      { dy: -1, dx: -1 },
      { dy: 1, dx: -1 },
      { dy: -1, dx: 1 },
      { dy: 1, dx: 1 },
    ],
  },
  [Creatures.Mantis]: {
    id: Creatures.Mantis,
    kanji: "蟷",
    movements: [
      { dy: -1, dx: -1 },
      { dy: -1, dx: 1 },
      { dy: 1, dx: 0 },
    ],
  },
  [Creatures.Horse]: {
    id: Creatures.Horse,
    kanji: "馬",
    movements: [
      { dy: 0, dx: -1 },
      { dy: 1, dx: 0 },
      { dy: -1, dx: 0 },
    ],
  },
  [Creatures.Ox]: {
    id: Creatures.Ox,
    kanji: "丑",
    movements: [
      { dy: -1, dx: 0 },
      { dy: 1, dx: 0 },
      { dy: 0, dx: 1 },
    ],
  },
  [Creatures.Crane]: {
    id: Creatures.Crane,
    kanji: "鶴",
    movements: [
      { dy: 1, dx: -1 },
      { dy: 1, dx: 1 },
      { dy: -1, dx: 0 },
    ],
  },
  [Creatures.Boar]: {
    id: Creatures.Boar,
    kanji: "猪",
    movements: [
      { dy: 0, dx: -1 },
      { dy: 0, dx: 1 },
      { dy: -1, dx: 0 },
    ],
  },
  [Creatures.Eel]: {
    id: Creatures.Eel,
    kanji: "鰻",
    movements: [
      { dy: -1, dx: -1 },
      { dy: 1, dx: -1 },
      { dy: 0, dx: 1 },
    ],
  },
  [Creatures.Cobra]: {
    id: Creatures.Cobra,
    kanji: "蛇",
    movements: [
      { dy: 0, dx: -1 },
      { dy: -1, dx: 1 },
      { dy: 1, dx: 1 },
    ],
  },
};
