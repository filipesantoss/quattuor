"use client";

import { Idol } from "%/@game/(board)/idol";
import { Movement } from "%/@game/(board)/movement";
import { Shrine } from "%/@game/(board)/shrine";
import { Target } from "%/@game/(board)/target";
import { cn } from "&/cn";
import type { Field as FieldProperties } from "&/entity/field";
import { Elements } from "&/entity/idol";
import { selectors } from "&/state/game";
import { useSelector } from "&/state/store";
import type { FunctionComponent, PropsWithChildren } from "react";
import { useMemo } from "react";

export function Field({
  data,
}: {
  data: FieldProperties;
}) {
  const shrine = useSelector((state) => selectors.shrineByFieldId(state, data.id));
  const movement = useSelector((state) => selectors.movementByTargetFieldId(state, data.id));
  const occupier = useSelector((state) => selectors.occupierByFieldId(state, data.id));

  const Moveable = useMemo<FunctionComponent<PropsWithChildren>>(() => {
    return ({ children }) => {
      if (movement === null) {
        return children;
      }

      if (shrine?.claimed ?? false) {
        return children;
      }

      return <Movement data={movement}>{children}</Movement>;
    };
  }, [movement, shrine]);

  const children = useMemo(() => {
    if (occupier !== null) {
      return <Idol data={occupier} />;
    }

    if (shrine !== null) {
      return <Shrine data={shrine} />;
    }

    if (movement !== null) {
      return <Target data={data} />;
    }

    return null;
  }, [shrine, occupier, data, movement]);

  return (
    <Moveable>
      <div
        className={cn("bg-secondary-foreground text-primary", {
          "bg-green-300": data.influencer === Elements.Earth,
          "bg-red-300": data.influencer === Elements.Fire,
          "bg-blue-300": data.influencer === Elements.Water,
          "bg-slate-300": data.influencer === Elements.Wind,
          "bg-primary": movement !== null,
          "bg-secondary": shrine?.claimed ?? false,
        })}
      >
        {children}
      </div>
    </Moveable>
  );
}
