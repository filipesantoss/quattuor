"use client";

import { Idol } from "%/@game/(board)/idol";
import { Move } from "%/@game/(board)/move";
import { Shrine } from "%/@game/(board)/shrine";
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
  const idol = useSelector((state) => selectors.idolByFieldId(state, data.id));

  const Moveable = useMemo<FunctionComponent<PropsWithChildren>>(() => {
    return ({ children }) => {
      if (move === null) {
        return children;
      }

      if (shrine != null && shrine.idol != null) {
        return children;
      }

      return <Move data={move}>{children}</Move>;
    };
  }, [move, shrine]);

  const Area = useMemo<FunctionComponent<PropsWithChildren>>(() => {
    return ({ children }) => (
      <Moveable>
        <div
          className={cn("bg-secondary-foreground text-primary", {
            "bg-green-300": data.influence === Elements.Earth,
            "bg-red-300": data.influence === Elements.Fire,
            "bg-blue-300": data.influence === Elements.Water,
            "bg-slate-300": data.influence === Elements.Wind,
            "bg-primary": move !== null,
            "bg-secondary": shrine !== null && shrine.idol !== null,
          })}
        >
          {children}
        </div>
      </Moveable>
    );
  }, [data, move, shrine, Moveable]);

  if (shrine !== null) {
    return (
      <Area>
        <Shrine data={shrine} />
      </Area>
    );
  }

  if (idol !== null) {
    return (
      <Area>
        <Idol
          data={idol}
          className={cn({
            "bg-green-300": data.influence === Elements.Earth,
            "bg-red-300": data.influence === Elements.Fire,
            "bg-blue-300": data.influence === Elements.Water,
            "bg-slate-300": data.influence === Elements.Wind,
          })}
        />
      </Area>
    );
  }

  return <Area />;
}
