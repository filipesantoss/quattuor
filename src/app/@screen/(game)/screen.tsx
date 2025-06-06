import { Board } from "%/@screen/(game)/(board)/board";
import { Menu } from "%/@screen/(game)/(menu)/menu";
import { Bar } from "%/@screen/(game)/(sequence)/bar";

export function GameScreen() {
  return (
    <main className="min-h-full grid grid-flow-row place-content-center gap-y-4 lg:gap-y-8 py-4">
      <Board />
      <Menu />
      <Bar />
    </main>
  );
}
