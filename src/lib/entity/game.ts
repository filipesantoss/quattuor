import { assert } from "&/assert";
import type { Field } from "&/entity/field";
import { enter, hosts, leave, matches, offset } from "&/entity/field";
import type { Idol } from "&/entity/idol";
import type { Shrine } from "&/entity/shrine";
import { claim } from "&/entity/shrine";
import type { Movement, Spirit } from "&/entity/spirit";
import { performs, serves } from "&/entity/spirit";

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
 * Advances the game by a step.
 */
export function step(this: Game, movement: Movement): void {
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
  const claims = enter.call(to, idol);

  if (repeater === idol.id) {
    return;
  }

  if (!claims) {
    this.sequence = [...creatures, creature];
    return;
  }

  assert(to.shrine !== null);
  const shrine = this.shrines[to.shrine];
  claim.call(shrine, idol);

  const free = Object.values(this.spirits).filter((spirit) => serves.call(spirit, idol));
  this.sequence = this.sequence.filter((creature) => !free.some((spirit) => spirit.id === creature));
}
