import { cn } from "&/cn";
import { Elements } from "&/entity/idol";
import type { Shrine as ShrineProperties } from "&/entity/shrine";
import { LocateIcon } from "lucide-react";

export function Shrine({
  data,
}: {
  data: ShrineProperties;
}) {
  return (
    <LocateIcon
      className={cn({
        "fill-earth": data.id === Elements.Earth,
        "fill-fire": data.id === Elements.Fire,
        "fill-water": data.id === Elements.Water,
        "fill-wind": data.id === Elements.Wind,
        "fill-background": data.claimed,
      })}
    />
  );
}
