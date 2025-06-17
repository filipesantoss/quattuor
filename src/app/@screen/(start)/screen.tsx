import { Learn } from "%/@screen/(start)/learn";
import { Sprawl } from "%/@screen/(start)/sprawl";

export function StartScreen() {
  return (
    <main className="min-h-full grid grid-flow-row place-items-center *:w-fit gap-y-8">
      <em className="text-6xl">quattuor</em>
      <div className="grid grid-flow-col gap-4">
        <Sprawl />
        <Learn className="border-1" />
      </div>
    </main>
  );
}
