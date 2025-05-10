"use client";

import type { Movement as MovementProperties } from "&/entity/movement";
import { actions } from "&/state/game";
import { useDispatch } from "&/state/store";
import { Button } from "@ariakit/react";
import type { PropsWithChildren } from "react";

/**
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/button/
 */
export function Movement({
  data,
  children,
}: PropsWithChildren<{
  data: MovementProperties;
}>) {
  const dispatch = useDispatch();

  return (
    <Button
      aria-label="Move"
      className="grid place-content-center bg-primary motion-safe:animate-pulse focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary-foreground"
      onClick={() => {
        dispatch(actions.move(data));
      }}
    >
      {children}
    </Button>
  );
}
