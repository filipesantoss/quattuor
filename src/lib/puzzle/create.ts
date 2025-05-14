import { assert } from "&/assert";
import { encode } from "&/encoding";
import { abandon, enter } from "&/entity/field";
import type { Game } from "&/entity/game";
import { beastiary } from "&/puzzle/bestiary";
import { initial } from "&/state/initial";
import clone from "clone-deep";
import { shuffle } from "fast-shuffle";
import { solve } from "./solve";

const created = new Set<string>();

export function create(): Game {
  while (true) {
    const game = build();
    const entry = encode(game);
    if (created.has(entry)) {
      continue;
    }

    created.add(entry);
    const solutions = solve(game);
    if (solutions.length !== 0) {
      return game;
    }
  }
}

function build(): Game {
  const game = clone(initial);
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
  for (let index = 0; index < starts.length; index++) {
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
    const idol = idols[index % idols.length];
    assert(idol !== undefined);

    game.sequence = [...game.sequence, beast.id];
    game.spirits[beast.id] = { ...beast, master: idol.id };
  }

  return game;
}
