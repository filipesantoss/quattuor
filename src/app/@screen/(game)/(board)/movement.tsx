"use client";

import type { Movement as MovementProperties } from "&/entity/spirit";
import { actions } from "&/state/game";
import { useDispatch } from "&/state/store";
import { Button } from "&/ui/button";
import { Tooltip } from "&/ui/tooltip";
import type { PropsWithChildren } from "react";

export function Movement({
  data,
  children,
}: PropsWithChildren<{
  data: MovementProperties;
}>) {
  const dispatch = useDispatch();

  return (
    <Tooltip>
      <Tooltip.Trigger asChild>
        <Button
          aria-label="Move"
          className="grid place-content-center bg-accent motion-safe:animate-pulse"
          onClick={() => {
            dispatch(actions.move(data));
          }}
        >
          {children}
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Content>
        <span>Move the active idol.</span>
      </Tooltip.Content>
    </Tooltip>
  );
}
