"use client";

import { Spirit } from "%/@screen/(game)/(sequence)/spirit";
import { useSelector } from "&/state/store";

export function Bar() {
  const spirits = useSelector((state) => Object.values(state.game.spirits));

  return (
    <div className="relative w-full h-12 md:h-14 lg:h-16">
      <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 h-3 mg:h-3.5 lg:h-4 rounded-sm bg-secondary" />
      <div className="absolute inset-0 grid grid-flow-col place-items-center place-content-around">
        {spirits.map((spirit) => (
          <Spirit key={spirit.id} data={spirit} />
        ))}
      </div>
    </div>
  );
}
