"use client";

import type { Idol as IdolProperties } from "&/entity/idol";
import { Elements } from "&/entity/idol";
import { selectors } from "&/state/game";
import { useSelector } from "&/state/store";
import cn from "classnames";
import { DropletIcon, FlameIcon, MountainIcon, WindIcon } from "lucide-react";
import { useMemo } from "react";

export function Idol({
  data,
}: {
  data: IdolProperties;
}) {
  const active = useSelector((state) => selectors.isActiveElementByIdolId(state, data.id));

  const children = useMemo(() => {
    switch (data.id) {
      case Elements.Fire:
        return (
          <FlameIcon
            className={cn("fill-red-200", {
              "fill-red-400": active,
              "stroke-red-600": active,
              "motion-safe:animate-pulse": active,
              "motion-reduce:delay-100": active,
            })}
          />
        );
      case Elements.Water:
        return (
          <DropletIcon
            className={cn("fill-blue-200", {
              "fill-blue-400": active,
              "stroke-blue-600": active,
              "motion-safe:animate-pulse": active,
              "motion-reduce:delay-100": active,
            })}
          />
        );
      case Elements.Earth:
        return (
          <MountainIcon
            className={cn("fill-green-200", {
              "fill-green-400": active,
              "stroke-green-600": active,
              "motion-safe:animate-pulse": active,
              "motion-reduce:delay-100": active,
            })}
          />
        );
      case Elements.Wind:
        return (
          <WindIcon
            className={cn("fill-slate-200", {
              "fill-slate-400": active,
              "stroke-slate-600": active,
            })}
          />
        );
      default:
        throw Error();
    }
  }, [data.id, active]);

  return (
    <div
      className={cn("grid place-content-center text-primary bg-secondary-foreground *:size-4 *:md:size-8", {
        "motion-safe:animate-pulse": active,
        "motion-reduce:delay-100": active,
      })}
    >
      {children}
    </div>
  );
}
