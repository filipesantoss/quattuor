"use client";

import { Board } from "%/@screen/(game)/(board)/board";
import { Menu } from "%/@screen/(game)/(menu)/menu";
import { Sprawl } from "%/@screen/(start)/sprawl";
import { started } from "&/entity/game";
import { useSelector } from "&/state/store";

export default function Screen() {
  const playing = useSelector((state) => started.call(state.game));

  if (!playing) {
    return <Sprawl />;
  }

  return (
    <>
      <Board />
      <Menu />
    </>
  );
}
