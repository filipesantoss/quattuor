"use client";

import { cn } from "&/cn";
import { Elements } from "&/entity/idol";
import type { Shrine as ShrineProperties } from "&/entity/shrine";
import { CircleIcon } from "lucide-react";

export function Shrine({
  data,
}: {
  data: ShrineProperties;
}) {
  return (
    <CircleIcon
      className={cn({
        "fill-green-300": data.id === Elements.Earth,
        "fill-red-300": data.id === Elements.Fire,
        "fill-blue-300": data.id === Elements.Water,
        "fill-slate-300": data.id === Elements.Wind,
      })}
    />
  );
}
