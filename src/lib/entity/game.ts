import { assert } from "&/assert";
import type { Field } from "&/entity/field";
import { accepts, enter, hosts, leave, matches, offset } from "&/entity/field";
import type { Idol } from "&/entity/idol";
import type { Shrine } from "&/entity/shrine";
import { attuned, claim } from "&/entity/shrine";
import type { Movement, Spirit } from "&/entity/spirit";
import { is, performs, serves } from "&/entity/spirit";

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

    const complies = accepts.call(to, idol);
    if (to.shrine !== null) {
      const shrine = this.shrines[to.shrine];
      return complies && !shrine.claimed;
    }

    return complies;
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

  const target = offset.call(from, movement);
  const to = Object.values(this.fields).find((field) => matches.call(field, target));
  assert(to !== undefined);

  leave.call(from, idol);
  const repeater = to.influencer;
  enter.call(to, idol);

  if (repeater === idol.id) {
    return;
  }

  const next = [...creatures, creature];
  if (to.shrine === null) {
    this.sequence = next;
    return;
  }

  const shrine = this.shrines[to.shrine];
  if (!attuned.call(shrine, idol)) {
    this.sequence = next;
    return;
  }

  claim.call(shrine, idol);

  const free = Object.values(this.spirits).filter((spirit) => serves.call(spirit, idol));
  this.sequence = this.sequence.filter((creature) => !free.some((spirit) => is.call(spirit, creature)));
}
