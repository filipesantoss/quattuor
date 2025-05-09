"use client";

import { Field } from "%/@board/field.component";
import { SIDE } from "&/state/initial";
import { useSelector } from "&/state/store";

export function Board() {
  const ids = useSelector((state) => Object.keys(state.game.fields));

  return (
    <main
      className="grid max-h-full gap-2 p-2 aspect-square bg-secondary *:col-span-1 *:row-span-1"
      style={{
        gridTemplateColumns: `repeat(${SIDE}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${SIDE}, minmax(0, 1fr))`,
      }}
    >
      {ids.map((id) => (
        <Field key={id} id={id} />
      ))}
    </main>
  );
}
