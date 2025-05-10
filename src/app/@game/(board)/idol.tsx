"use client";

import { cn } from "&/cn";
import type { Idol as IdolProperties } from "&/entity/idol";
import { Elements } from "&/entity/idol";
import { selectors } from "&/state/game";
import { useSelector } from "&/state/store";
import { DropletIcon, FlameIcon, MountainIcon, WindIcon } from "lucide-react";
import { useMemo } from "react";

export function Idol({
  data,
  className,
}: {
  data: IdolProperties;
  className: React.ButtonHTMLAttributes<HTMLDivElement>["className"];
}) {
  const idol = useSelector((state) => selectors.idolByActiveBeast(state));
  const active = idol.id === data.id;

  const children = useMemo(() => {
    switch (data.id) {
      case Elements.Fire:
        return (
          <FlameIcon
            className={cn("fill-red-200", {
              "fill-red-500": active,
              "stroke-red-800": active,
            })}
          />
        );
      case Elements.Water:
        return (
          <DropletIcon
            className={cn("fill-blue-200", {
              "fill-blue-500": active,
              "stroke-blue-800": active,
            })}
          />
        );
      case Elements.Earth:
        return (
          <MountainIcon
            className={cn("fill-green-200", {
              "fill-green-500": active,
              "stroke-green-800": active,
            })}
          />
        );
      case Elements.Wind:
        return (
          <WindIcon
            className={cn("fill-slate-200", {
              "fill-slate-500": active,
              "stroke-slate-800": active,
            })}
          />
        );
      default:
        throw Error();
    }
  }, [data.id, active]);

  return (
    <div
      className={cn("grid place-content-center text-primary bg-secondary-foreground", className, {
        "motion-safe:animate-pulse": active,
        "motion-reduce:delay-100": active,
      })}
    >
      {children}
    </div>
  );
}
