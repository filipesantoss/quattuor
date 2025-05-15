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
import type { Idol } from "&/entity/idol";
import equal from "fast-deep-equal";

/**
 * The sixteen Creatures.
 */
export enum Creatures {
  Tiger = "TIGER",
  Dragon = "DRAGON",
  Frog = "FROG",
  Rabbit = "RABBIT",
  Crab = "CRAB",
  Elephant = "ELEPHANT",
  Goose = "GOOSE",
  Rooster = "ROOSTER",
  Monkey = "MONKEY",
  Mantis = "MANTIS",
  Horse = "HORSE",
  Ox = "OX",
  Crane = "CRANE",
  Boar = "BOAR",
  Eel = "EEL",
  Cobra = "COBRA",
}

export interface Movement {
  /**
   * The change in the y-axis.
   * A positive value represents a downard movement.
   * A negative value represents an upward movement.
   */
  dy: number;

  /**
   * The change in the x-axis.
   * A positive value represents a rightward movement.
   * A negative value represents a leftward movement.
   */
  dx: number;
}

export interface Beast {
  /**
   * A unique identifier for the Beast.
   */
  id: Creatures;

  /**
   * The Movements performed by the Beast.
   */
  movements: Movement[];
}

/**
 * Verifies whether the Beast if able to perform the provided Movement.
 */
export function performs(this: Beast, movement: Movement): boolean {
  assert(this.movements.length > 0);
  return this.movements.some((known) => equal(known, movement));
}

/**
 * Verifies whether the Beast is the provided Creature.
 */
export function is(this: Beast, creature: Creatures): boolean {
  return this.id === creature;
}

export interface Spirit extends Beast {
  /**
   * A reference to the Idol that tamed this Beast.
   */
  master: Idol["id"];
}

/**
 * Verifies whether the Spirit has the provided Idol as its master.
 */
export function serves(this: Spirit, idol: Idol): boolean {
  return this.master === idol.id;
}
