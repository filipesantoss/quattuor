"use client";

import { cn } from "&/cn";
import type { Field as FieldProperties } from "&/entity/field";
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
  const Icon = data.influencer === idol.id ? CircleIcon : CircleDashedIcon;

  return (
    <Icon
      className={cn({
        "stroke-green-300": idol.id === Elements.Earth,
        "stroke-red-300": idol.id === Elements.Fire,
        "stroke-blue-300": idol.id === Elements.Water,
        "stroke-slate-300": idol.id === Elements.Wind,
      })}
    />
  );
}
