"use client";

import { DefeatScreen } from "%/@screen/(defeat)/screen";
import { GameScreen } from "%/@screen/(game)/screen";
import { StartScreen } from "%/@screen/(start)/screen";
import { lost, started } from "&/entity/game";
import { useSelector } from "&/state/store";

export default function Screen() {
  const playing = useSelector((state) => started.call(state.game));
  const defeat = useSelector((state) => lost.call(state.game));

  if (!playing) {
    return <StartScreen />;
  }

  if (defeat) {
    return <DefeatScreen />;
  }

  return <GameScreen />;
}
