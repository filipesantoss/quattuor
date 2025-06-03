"use client";

import { Field } from "%/@screen/(game)/(board)/field";
import { SIDE } from "&/state/initial";
import { useSelector } from "&/state/store";

export function Board() {
  const fields = useSelector((state) => Object.values(state.game.fields));

  return (
    <main
      className="grid grid-flow-row max-h-full gap-2 md:gap-4 p-2 md:p-4 aspect-square bg-secondary *:p-1 *:md:p-4 *:min-h-4 *:min-w-4"
      style={{
        gridTemplateColumns: `repeat(${SIDE}, minmax(calc(var(--spacing)*4), 1fr))`,
        gridTemplateRows: `repeat(${SIDE}, minmax(calc(var(--spacing)*4), 1fr))`,
      }}
    >
      {fields.map((field) => (
        <Field key={field.id} data={field} />
      ))}
    </main>
  );
}
