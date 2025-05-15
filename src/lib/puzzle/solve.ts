// Copyright 2025 @filipesantoss
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { assert } from "&/assert";
import { decode, encode } from "&/encoding";
import { hosts, matches, offset } from "&/entity/field";
import type { Game } from "&/entity/game";
import { lost, scan, step, won } from "&/entity/game";
import type { Movement } from "&/entity/spirit";
import { performs } from "&/entity/spirit";
import clone from "clone-deep";

/**
 * Identifies all the Movement sequances that solve the provided Game.
 */
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

      const [creature] = dupe.sequence;
      assert(creature !== undefined);

      const spirit = dupe.spirits[creature];
      assert(spirit !== undefined);
      assert(performs.call(spirit, movement));

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
