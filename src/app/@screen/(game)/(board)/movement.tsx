"use client";

import type { Movement as MovementProperties } from "&/entity/spirit";
import { actions } from "&/state/game";
import { useDispatch } from "&/state/store";
import { Button } from "&/ui/button";
import type { PropsWithChildren } from "react";

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
      className="grid place-content-center bg-accent border-1 border-secondary-foreground motion-safe:animate-pulse focus-visible:outline-secondary-foreground"
      onClick={() => {
        dispatch(actions.move(data));
      }}
    >
      {children}
    </Button>
  );
}
