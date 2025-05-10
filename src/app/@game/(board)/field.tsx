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
  const move = useSelector((state) => selectors.moveByFieldId(state, data.id));
  const occupier = useSelector((state) => selectors.occupierByFieldId(state, data.id));

  const Moveable = useMemo<FunctionComponent<PropsWithChildren>>(() => {
    return ({ children }) => {
      if (move === null) {
        return children;
      }

      if (shrine?.claimed ?? false) {
        return children;
      }

      return <Movement data={move}>{children}</Movement>;
    };
  }, [move, shrine]);

  const children = useMemo(() => {
    if (shrine !== null) {
      return <Shrine data={shrine} />;
    }

    if (occupier !== null) {
      return (
        <Idol
          data={occupier}
          className={cn({
            "bg-green-300": data.influencer === Elements.Earth,
            "bg-red-300": data.influencer === Elements.Fire,
            "bg-blue-300": data.influencer === Elements.Water,
            "bg-slate-300": data.influencer === Elements.Wind,
          })}
        />
      );
    }

    if (move !== null) {
      return <Target data={data} />;
    }

    return null;
  }, [shrine, occupier, data, move]);

  return (
    <Moveable>
      <div
        className={cn("bg-secondary-foreground text-primary", {
          "bg-green-300": data.influencer === Elements.Earth,
          "bg-red-300": data.influencer === Elements.Fire,
          "bg-blue-300": data.influencer === Elements.Water,
          "bg-slate-300": data.influencer === Elements.Wind,
          "bg-primary": move !== null,
          "bg-secondary": shrine?.claimed ?? false,
        })}
      >
        {children}
      </div>
    </Moveable>
  );
}
