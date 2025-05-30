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
}: {
  data: IdolProperties;
}) {
  const idol = useSelector((state) => selectors.idolByActiveCreature(state));
  const active = idol.id === data.id;

  const children = useMemo(() => {
    switch (data.id) {
      case Elements.Fire:
        return <FlameIcon className="fill-fire" />;
      case Elements.Water:
        return <DropletIcon className="fill-water" />;
      case Elements.Earth:
        return <MountainIcon className="fill-earth" />;
      case Elements.Wind:
        return <WindIcon className="fill-wind" />;
      default:
        throw Error();
    }
  }, [data.id]);

  return (
    <div
      className={cn("grid place-content-center", {
        "motion-safe:animate-pulse": active,
      })}
    >
      {children}
    </div>
  );
}
