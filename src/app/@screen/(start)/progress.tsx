"use client";

import { selectors } from "&/state/puzzles";
import { useSelector } from "&/state/store";
import { Meter } from "&/ui/meter";

export function Progress() {
  const max = useSelector((state) => Object.entries(state.puzzles).length);
  const left = useSelector((state) => selectors.unbeaten(state).length);

  return <Meter max={max} value={max - left} className="w-xs" aria-label={`${left} puzzles left.`} />;
}
