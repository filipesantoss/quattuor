"use client";

import { Move } from "%/@game/(board)/move";
import type { Move as MoveProperties } from "&/entity/card";
import { Elements } from "&/entity/piece";
import type { Shrine as ShrineProperties } from "&/entity/shrine";
import { useSelector } from "&/state/store";
import cn from "classnames";
import { useMemo } from "react";

export function Shrine({
  id,
  move,
}: {
  id: ShrineProperties["id"];
  move: MoveProperties | null;
}) {
  const shrine = useSelector((state) => state.game.shrines[id] ?? null);
  if (shrine === null) {
    throw Error();
  }

  const children = useMemo(() => {
    return (
      <div
        className={cn("size-4 md:size-8 rounded-full", {
          "bg-green-300": shrine.id === Elements.Earth,
          "bg-red-300": shrine.id === Elements.Fire,
          "bg-blue-300": shrine.id === Elements.Water,
          "bg-slate-300": shrine.id === Elements.Wind,
        })}
      />
    );
  }, [shrine]);

  if (shrine.piece !== null) {
    return <div className="bg-secondary" />;
  }

  if (move !== null) {
    return (
      <Move x={move.dx} y={move.dy}>
        {children}
      </Move>
    );
  }

  return <div className="grid place-content-center text-primary bg-secondary-foreground">{children}</div>;
}
