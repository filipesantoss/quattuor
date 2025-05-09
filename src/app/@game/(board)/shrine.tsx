"use client";

import { Move } from "%/@game/(board)/move";
import type { Move as MoveProperties } from "&/entity/card";
import { Elements } from "&/entity/idol";
import type { Shrine as ShrineProperties } from "&/entity/shrine";
import cn from "classnames";
import { useMemo } from "react";

export function Shrine({
  data,
  move,
}: {
  data: ShrineProperties;
  move: MoveProperties | null;
}) {
  const children = useMemo(() => {
    return (
      <div
        className={cn("size-4 md:size-8 rounded-full", {
          "bg-green-300": data.id === Elements.Earth,
          "bg-red-300": data.id === Elements.Fire,
          "bg-blue-300": data.id === Elements.Water,
          "bg-slate-300": data.id === Elements.Wind,
        })}
      />
    );
  }, [data]);

  if (data.idol !== null) {
    return <div className="bg-secondary" />;
  }

  if (move !== null) {
    return <Move data={move}>{children}</Move>;
  }

  return <div className="grid place-content-center text-primary bg-secondary-foreground">{children}</div>;
}
