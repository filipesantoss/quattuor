"use client";

import { Move } from "%/@game/(board)/move";
import { Piece } from "%/@game/(board)/piece";
import { Shrine } from "%/@game/(board)/shrine";
import type { Field as FieldProperties } from "&/entity/field";
import { selectors } from "&/state/game";
import { useSelector } from "&/state/store";

export function Field({
  id,
}: {
  id: FieldProperties["id"];
}) {
  const shrine = useSelector((state) => selectors.shrineByFieldId(state, id));
  const piece = useSelector((state) => selectors.pieceByFieldId(state, id));
  const move = useSelector((state) => selectors.moveByFieldId(state, id));

  if (shrine !== null) {
    return <Shrine id={shrine.id} move={move} />;
  }

  if (piece !== null) {
    return <Piece id={piece.id} />;
  }

  if (move !== null) {
    return <Move x={move.dx} y={move.dy} />;
  }

  return <div className="bg-secondary-foreground" />;
}
