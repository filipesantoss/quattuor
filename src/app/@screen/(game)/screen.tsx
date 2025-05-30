import { Board } from "%/@screen/(game)/(board)/board";
import { Menu } from "%/@screen/(game)/(menu)/menu";

export function GameScreen() {
  return (
    <div className="grid grid-flow-row place-content-center gap-y-8">
      <Board />
      <Menu />
    </div>
  );
}
