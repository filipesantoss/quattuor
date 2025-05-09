"use client";

import { Piece } from "%/@board/piece.component";
import type { Field as Properties } from "&/state/entity/field";
import { selectors } from "&/state/game";
import { useSelector } from "&/state/store";

export function Field({
  id,
}: {
  id: Properties["id"];
}) {
  const field = useSelector((state) => selectors.fieldByFieldId(state, id));
  if (field === null) {
    throw Error();
  }

  const piece = useSelector((state) => selectors.pieceByCoordinateId(state, field.coordinate));
  if (piece !== null) {
    return <Piece id={piece.id} />;
  }

  return <div />;
}
