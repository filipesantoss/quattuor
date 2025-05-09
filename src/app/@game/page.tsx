"use client";

import { Board } from "%/@game/(board)/board";
import { useSelector } from "&/state/store";

export default function Game() {
  const ready = useSelector((state) => state.game.beasts.length !== 0);

  if (!ready) {
    return null;
  }

  return <Board />;
}
