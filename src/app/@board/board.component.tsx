"use client";

import { Field } from "%/@board/field.component";
import { SIDE } from "&/state/initial";
import { useSelector } from "&/state/store";
import { createSelector } from "@reduxjs/toolkit";

const selector = createSelector([(state) => state.game.fields], (map) => Object.keys(map));

export function Board() {
  const ids = useSelector(selector);

  return (
    <main
      className="grid max-h-full gap-2 p-2 aspect-square bg-secondary *:col-span-1 *:row-span-1 *:bg-secondary-foreground"
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
