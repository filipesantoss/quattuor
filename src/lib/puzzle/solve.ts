import { assert } from "&/assert";
import { decode, encode } from "&/encoding";
import { hosts, matches, offset } from "&/entity/field";
import type { Game } from "&/entity/game";
import { lost, scan, step, won } from "&/entity/game";
import type { Movement } from "&/entity/spirit";
import clone from "clone-deep";
import equal from "fast-deep-equal";

export function solve(game: Game): Movement[][] {
  const solutions = new Set<string>();
  const simulated = new Set<string>();

  const queue: string[] = [];
  queue.push(encode<Item>({ game, path: [] }));

  while (queue.length > 0) {
    const entry = queue.shift();
    assert(entry !== undefined);

    const item = decode<Item>(entry);
    const movements = scan.call(item.game);

    for (const movement of movements) {
      const dupe = clone(item.game);
      assert(equal(dupe, item.game));

      const [creature] = dupe.sequence;
      assert(creature !== undefined);

      const spirit = dupe.spirits[creature];
      assert(spirit !== undefined);

      const idol = dupe.idols[spirit.master];
      const from = Object.values(dupe.fields).find((field) => hosts.call(field, idol));
      assert(from !== undefined);

      const target = offset.call(from, movement);
      const to = Object.values(dupe.fields).find((field) => matches.call(field, target));
      assert(to !== undefined);

      const simulation = encode({ spirit, from, movement });
      if (simulated.has(simulation)) {
        continue;
      }

      simulated.add(simulation);
      step.call(dupe, movement);
      const path = [...item.path, movement];

      const solution = encode<Movement[]>(path);
      if (solutions.has(solution)) {
        continue;
      }

      if (won.call(dupe)) {
        solutions.add(solution);
        continue;
      }

      if (lost.call(dupe)) {
        continue;
      }

      queue.push(encode<Item>({ game: dupe, path }));
    }
  }

  return Array.from(solutions).map((solution) => decode<Movement[]>(solution));
}

interface Item {
  game: Game;
  path: Movement[];
}
