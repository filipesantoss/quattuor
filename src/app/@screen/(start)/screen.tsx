import { Sprawl } from "%/@screen/(start)/sprawl";

export function StartScreen() {
  return (
    <div className="grid grid-flow-row place-items-center *:w-fit gap-y-8">
      <em className="text-6xl motion-safe:animate-bounce">quattuor</em>
      <Sprawl />
    </div>
  );
}
