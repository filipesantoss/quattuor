"use client";

import { Move } from "%/@game/(board)/move";
import { Piece } from "%/@game/(board)/piece";
import { Shrine } from "%/@game/(board)/shrine";
import type { Field as FieldProperties } from "&/entity/field";
import { selectors } from "&/state/game";
import { useSelector } from "&/state/store";

export function Field({
  data,
}: {
  data: FieldProperties;
}) {
  const shrine = useSelector((state) => selectors.shrineByFieldId(state, data.id));
  const move = useSelector((state) => selectors.moveByFieldId(state, data.id));
  const piece = useSelector((state) => selectors.pieceByFieldId(state, data.id));

  if (shrine !== null) {
    return <Shrine data={shrine} move={move} />;
  }

  if (piece !== null) {
    return <Piece data={piece} />;
  }

  if (move !== null) {
    return <Move data={move} />;
  }

  return <div className="bg-secondary-foreground" />;
}
