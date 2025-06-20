import { Sprawl } from "%/@screen/(start)/sprawl";

export function DefeatScreen() {
  return (
    <main className="min-h-full grid grid-flow-row place-items-center *:w-fit gap-y-8">
      <p className="text-4xl font-semibold motion-safe:animate-in motion-safe:fade-in-0 motion-safe:duration-1000">
        Defeat.
      </p>
      <Sprawl />
    </main>
  );
}
