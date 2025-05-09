"use client";

import type { Move as Properties } from "&/state/entity/card";
import { actions } from "&/state/game";
import { useDispatch } from "&/state/store";
import { Button } from "@ariakit/react";

export function Move({
  x,
  y,
}: {
  x: Properties["dx"];
  y: Properties["dy"];
}) {
  const dispatch = useDispatch();

  return (
    <Button
      className="bg-primary motion-safe:animate-pulse"
      onClick={() => {
        dispatch(actions.move({ dx: x, dy: y }));
      }}
    />
  );
}
