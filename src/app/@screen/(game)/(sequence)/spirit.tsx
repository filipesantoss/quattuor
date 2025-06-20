"use client";

import { cn } from "&/cn";
import type { Coordinate } from "&/entity/field";
import { matches, offset } from "&/entity/field";
import { Elements } from "&/entity/idol";
import type { Spirit as SpiritProperties } from "&/entity/spirit";
import { useSelector } from "&/state/store";
import { Button } from "&/ui/button";
import { Dialog } from "&/ui/dialog";
import { Tooltip } from "&/ui/tooltip";
import { DialogDisclosure, DialogProvider, TooltipAnchor, TooltipProvider } from "@ariakit/react";

export function Spirit({
  data,
}: {
  data: SpiritProperties;
}) {
  const active = useSelector((state) => state.game.sequence.at(0));

  return (
    <TooltipProvider>
      <DialogProvider>
        <TooltipAnchor
          render={(properties) => (
            <DialogDisclosure
              {...properties}
              autoFocus={properties.autoFocus ?? false}
              render={(properties) => (
                <Button
                  {...properties}
                  aria-label={data.id}
                  aria-describedby={data.id}
                  className={cn("grid place-content-center rounded-lg", {
                    "size-12 md:size-14 lg:size-16 text-2xl": data.id === active,
                    "size-6 md:size-8 lg:size-12": data.id !== active,
                    "bg-earth": data.master === Elements.Earth,
                    "bg-fire": data.master === Elements.Fire,
                    "bg-water": data.master === Elements.Water,
                    "bg-wind": data.master === Elements.Wind,
                  })}
                >
                  <span className="font-noto text-black motion-safe:animate-in motion-safe:zoom-in-0">
                    {data.kanji}
                  </span>
                </Button>
              )}
            />
          )}
        />
        <Tooltip id={data.id}>
          <span>Details on the {data.id} spirit.</span>
        </Tooltip>
        <Dialog className="grid-flow-col gap-8" label="Spirit">
          <div className="grid grid-flow-row gap-2 place-items-center h-fit">
            <span className="text-5xl font-bold">{data.kanji}</span>
            <span className="text-xl font-semibold capitalize">{data.id}</span>
          </div>
          <Preview data={data} />
        </Dialog>
      </DialogProvider>
    </TooltipProvider>
  );
}

function Preview({
  data,
}: {
  data: SpiritProperties;
}) {
  const side = 5;
  const center: Coordinate = { x: ~~(side / 2), y: ~~(side / 2) };

  return (
    <div className="grid grid-columns-5 grid-rows-5 grid-flow-col gap-1 aspect-square bg-secondary">
      {Array.from({ length: side ** 2 }).map((_, index) => {
        const y = index % side;
        const x = (index - y) / side;
        const target = { x, y };
        const base = matches.call(center, target);
        const movement = data.movements.some((movement) => matches.call(offset.call(center, movement), target));

        return (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: Element order never changes.
            key={index}
            className={cn("border-1 border-secondary-foreground size-8", {
              "bg-earth": base && data.master === Elements.Earth,
              "bg-fire": base && data.master === Elements.Fire,
              "bg-water": base && data.master === Elements.Water,
              "bg-wind": base && data.master === Elements.Wind,
              "bg-primary motion-safe:animate-pulse": movement,
            })}
          />
        );
      })}
    </div>
  );
}
