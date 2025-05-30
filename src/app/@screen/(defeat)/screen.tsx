"use client";

import { Sprawl } from "%/@screen/(start)/sprawl";

export function DefeatScreen() {
  return (
    <div className="grid grid-flow-row place-items-center *:w-fit gap-y-4 ">
      <p className="text-4xl font-semibold motion-safe:animate-in motion-safe:fade-in motion-safe:duration-1000">
        You Lost
      </p>
      <Sprawl />
    </div>
  );
}
