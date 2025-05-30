"use client";

import { cn } from "&/cn";
import { Elements } from "&/entity/idol";
import { useSelector } from "&/state/store";

export function Bar() {
  const spirits = useSelector((state) => Object.values(state.game.spirits));
  const active = useSelector((state) => state.game.sequence.at(0));

  return (
    <div className="relative w-full h-12 md:h-14 lg:h-16">
      <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 h-3 mg:h-3.5 lg:h-4 rounded-sm bg-secondary" />
      <div className="absolute inset-0 grid grid-flow-col place-items-center place-content-around">
        {spirits.map((spirit) => (
          <div
            key={spirit.id}
            className={cn("rounded-lg grid place-content-center border border-secondary-foreground", {
              "size-12 md:size-14 lg:size-16 text-2xl": spirit.id === active,
              "size-6 md:size-8 lg:size-12": spirit.id !== active,
              "bg-earth": spirit.master === Elements.Earth,
              "bg-fire": spirit.master === Elements.Fire,
              "bg-water": spirit.master === Elements.Water,
              "bg-wind": spirit.master === Elements.Wind,
            })}
          >
            <span className="font-noto text-black animate-in zoom-in-0">{spirit.id}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
