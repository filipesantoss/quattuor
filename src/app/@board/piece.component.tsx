"use client";

import { EarthPiece } from "%/@board/piece.earth.component";
import { FirePiece } from "%/@board/piece.fire.component";
import { WaterPiece } from "%/@board/piece.water.component";
import { WindPiece } from "%/@board/piece.wind.component";
import type { Piece as Properties } from "&/state/entity/piece";
import { Elements } from "&/state/entity/piece";
import { selectors } from "&/state/game";
import { useSelector } from "&/state/store";
import { useMemo } from "react";

export function Piece({
  id,
}: {
  id: Properties["id"];
}) {
  const piece = useSelector((state) => selectors.pieceByPieceId(state, id));
  if (piece === null) {
    throw Error();
  }

  const children = useMemo(() => {
    switch (piece.id) {
      case Elements.Fire:
        return <FirePiece />;
      case Elements.Water:
        return <WaterPiece />;
      case Elements.Earth:
        return <EarthPiece />;
      case Elements.Wind:
        return <WindPiece />;
      default:
        throw Error();
    }
  }, [piece.id]);

  return (
    <div className="grid place-content-center text-primary bg-secondary-foreground *:size-4 *:md:size-8">
      {children}
    </div>
  );
}
