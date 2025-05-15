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

/**
 * The four Elements.
 */
export enum Elements {
  Fire = "FIRE",
  Water = "WATER",
  Earth = "EARTH",
  Wind = "WIND",
}

export interface Idol {
  /**
   * A unique identifier for the Idol.
   * The Element possessing the Idol.
   */
  id: Elements;
}

/**
 * Verifies whether the Idol is unable to resist the provided Element.
 */
export function succumbs(this: Idol, element: Elements): boolean {
  switch (this.id) {
    case Elements.Earth:
      return element === Elements.Wind;
    case Elements.Fire:
      return element === Elements.Water;
    case Elements.Water:
      return element === Elements.Earth;
    case Elements.Wind:
      return element === Elements.Fire;
    default:
      throw Error();
  }
}

/**
 * Verifies whether the Idol is able to resist the provided Element.
 */
export function resists(this: Idol, element: Elements): boolean {
  if (element === this.id) {
    return true;
  }

  switch (this.id) {
    case Elements.Earth:
      return element === Elements.Water;
    case Elements.Fire:
      return element === Elements.Wind;
    case Elements.Water:
      return element === Elements.Fire;
    case Elements.Wind:
      return element === Elements.Earth;
    default:
      throw Error();
  }
}
