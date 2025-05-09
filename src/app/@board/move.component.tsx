"use client";

import type { Move as Properties } from "&/state/entity/card";
import { actions } from "&/state/game";
import { useDispatch } from "&/state/store";
import { Button } from "@ariakit/react";

/**
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/button/
 */
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
      role="button"
      aria-label="Move"
      className="bg-primary motion-safe:animate-pulse focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary-foreground"
      onClick={() => {
        dispatch(actions.move({ dx: x, dy: y }));
      }}
    />
  );
}
