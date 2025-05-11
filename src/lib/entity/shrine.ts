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

export function claim(this: Shrine, idol: Idol): void {
  assert(!this.claimed);
  assert(idol.id === this.id);
  this.claimed = true;
}
