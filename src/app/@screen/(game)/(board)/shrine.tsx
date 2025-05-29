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
        "stroke-green-500": data.id === Elements.Earth,
        "fill-green-500": data.id === Elements.Earth,
        "stroke-red-500": data.id === Elements.Fire,
        "fill-red-500": data.id === Elements.Fire,
        "stroke-blue-500": data.id === Elements.Water,
        "fill-blue-500": data.id === Elements.Water,
        "stroke-slate-500": data.id === Elements.Wind,
        "fill-slate-500": data.id === Elements.Wind,
      })}
    />
  );
}
