"use client";

import type { Movement as MovementProperties } from "&/entity/spirit";
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
      className="grid place-content-center bg-accent border-1 border-secondary-foreground motion-safe:animate-pulse focus-visible:outline-2 focus-visible:outline-secondary-foreground focus-visible:outline-offset-2"
      onClick={() => {
        dispatch(actions.move(data));
      }}
    >
      {children}
    </Button>
  );
}
