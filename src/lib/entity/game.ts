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
import type { Field } from "&/entity/field";
import { accepts, enter, hosts, influence, leave, matches, offset } from "&/entity/field";
import type { Idol } from "&/entity/idol";
import type { Shrine } from "&/entity/shrine";
import { attuned, claim } from "&/entity/shrine";
import type { Movement, Spirit } from "&/entity/spirit";
import { is, performs, serves } from "&/entity/spirit";
import equal from "fast-deep-equal";

/**
 * @see https://redux.js.org/usage/structuring-reducers/normalizing-state-shape
 */
export interface Game {
  idols: Record<Idol["id"], Idol>;
  shrines: Record<Shrine["id"], Shrine>;
  fields: Record<Field["id"], Field>;
  spirits: Partial<Record<Spirit["id"], Spirit>>;
  sequence: Spirit["id"][];
}

/**
 * Verifies whether the game is won.
 */
export function won(this: Game): boolean {
  return Object.values(this.shrines).every((shrine) => shrine.claimed);
}

/**
 * Verifies whether the game is lost.
 */
export function lost(this: Game): boolean {
  const options = scan.call(this);
  return options.length === 0;
}

/**
 * Verifies whether the game is ongoing.
 */
export function ongoing(this: Game): boolean {
  return this.sequence.length !== 0;
}

/**
 * Scans around the Field for Movements.
 */
export function scan(this: Game): Movement[] {
  assert(ongoing.call(this));

  const [creature] = this.sequence;
  assert(creature !== undefined);

  const spirit = this.spirits[creature];
  assert(spirit !== undefined);

  const idol = this.idols[spirit.master];
  const from = Object.values(this.fields).find((field) => hosts.call(field, idol));
  assert(from !== undefined);

  return spirit.movements.filter((movement) => {
    const target = offset.call(from, movement);
    const to = Object.values(this.fields).find((field) => matches.call(field, target));
    if (to === undefined) {
      return false;
    }

    if (!matches.call(to, target)) {
      return false;
    }

    const allowed = accepts.call(to, idol);
    if (to.shrine !== null) {
      const shrine = this.shrines[to.shrine];
      return allowed && !shrine.claimed;
    }

    return allowed;
  });
}

/**
 * Advances the Game by a step.
 */
export function step(this: Game, movement: Movement): void {
  assert(ongoing.call(this));

  const [creature, ...creatures] = this.sequence;
  assert(creature !== undefined);

  const spirit = this.spirits[creature];
  assert(spirit !== undefined);
  assert(performs.call(spirit, movement));

  const idol = this.idols[spirit.master];
  const from = Object.values(this.fields).find((field) => hosts.call(field, idol));
  assert(from !== undefined);

  for (const option of scan.call(this)) {
    const target = offset.call(from, option);
    const to = Object.values(this.fields).find((field) => matches.call(field, target));
    assert(to !== undefined);

    if (!equal(option, movement)) {
      influence.call(to, idol);
      continue;
    }

    leave.call(from, idol);
    const repeater = to.influencer;
    enter.call(to, idol);

    if (to.shrine === null && repeater === idol.id) {
      continue;
    }

    const next = [...creatures, creature];
    if (to.shrine === null) {
      this.sequence = next;
      continue;
    }

    const shrine = this.shrines[to.shrine];
    if (!attuned.call(shrine, idol)) {
      this.sequence = next;
      continue;
    }

    claim.call(shrine, idol);

    const free = Object.values(this.spirits).filter((spirit) => serves.call(spirit, idol));
    this.sequence = this.sequence.filter((creature) => !free.some((spirit) => is.call(spirit, creature)));
  }
}
