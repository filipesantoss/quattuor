"use client";

import { Idol } from "%/@screen/(game)/(board)/idol";
import { Movement } from "%/@screen/(game)/(board)/movement";
import { Shrine } from "%/@screen/(game)/(board)/shrine";
import { Target } from "%/@screen/(game)/(board)/target";
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
  const idol = useSelector((state) => selectors.idolByActiveCreature(state));

  const Container = useMemo<FunctionComponent<PropsWithChildren>>(() => {
    return ({ children }) => {
      if (movement === null || (shrine?.claimed ?? false)) {
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
    <Container>
      <div
        className={cn("text-primary", {
          "bg-earth": data.influencer === Elements.Earth,
          "bg-fire": data.influencer === Elements.Fire,
          "bg-water": data.influencer === Elements.Water,
          "bg-wind": data.influencer === Elements.Wind,
          "bg-secondary": shrine?.claimed ?? false,
          "bg-accent": movement !== null,
          "border border-secondary-foreground": movement === null,
          "shadow-lg shadow-primary": data.occupier === idol.id,
        })}
      >
        {children}
      </div>
    </Container>
  );
}
