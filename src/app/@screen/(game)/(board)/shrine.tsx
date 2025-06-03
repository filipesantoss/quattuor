import { cn } from "&/cn";
import { Elements } from "&/entity/idol";
import type { Shrine as ShrineProperties } from "&/entity/shrine";
import { XIcon } from "lucide-react";

export function Shrine({
  data,
}: {
  data: ShrineProperties;
}) {
  return (
    <XIcon
      className={cn({
        "stroke-earth": data.id === Elements.Earth,
        "stroke-fire": data.id === Elements.Fire,
        "stroke-water": data.id === Elements.Water,
        "stroke-wind": data.id === Elements.Wind,
      })}
    />
  );
}
