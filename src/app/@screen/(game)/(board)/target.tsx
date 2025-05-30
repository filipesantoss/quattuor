"use client";

import { cn } from "&/cn";
import type { Field as FieldProperties } from "&/entity/field";
import { worships } from "&/entity/field";
import { Elements } from "&/entity/idol";
import { selectors } from "&/state/game";
import { useSelector } from "&/state/store";
import { CircleDashedIcon, CircleIcon } from "lucide-react";

export function Target({
  data,
}: {
  data: FieldProperties;
}) {
  const idol = useSelector((state) => selectors.idolByActiveCreature(state));
  const Icon = worships.call(data, idol) ? CircleIcon : CircleDashedIcon;

  return (
    <Icon
      className={cn({
        "stroke-earth": idol.id === Elements.Earth,
        "stroke-fire": idol.id === Elements.Fire,
        "stroke-water": idol.id === Elements.Water,
        "stroke-wind": idol.id === Elements.Wind,
      })}
    />
  );
}
