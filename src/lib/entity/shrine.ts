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
