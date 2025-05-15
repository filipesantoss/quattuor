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

export interface Shrine {
  /**
   * A unique identifier for the Shrine.
   * A reference to the Idol who owns the Shrine.
   */
  id: Idol["id"];

  /**
   * Whether the Shrine has been claimed by its Idol.
   */
  claimed: boolean;
}

/**
 * Claims the Shrine of the provided Idol.
 */
export function claim(this: Shrine, idol: Idol): void {
  assert(!this.claimed);
  assert(attuned.call(this, idol));
  this.claimed = true;
}

/**
 * Verifies whether the Shrine is attuned to the provided Idol.
 */
export function attuned(this: Shrine, idol: Idol): boolean {
  return this.id === idol.id;
}
