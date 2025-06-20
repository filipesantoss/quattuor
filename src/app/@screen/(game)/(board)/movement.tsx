"use client";

import type { Movement as MovementProperties } from "&/entity/spirit";
import { actions } from "&/state/game";
import { useDispatch } from "&/state/store";
import { Button } from "&/ui/button";
import { Tooltip } from "&/ui/tooltip";
import { TooltipAnchor, TooltipProvider } from "@ariakit/react";
import type { PropsWithChildren } from "react";

export function Movement({
  data,
  children,
}: PropsWithChildren<{
  data: MovementProperties;
}>) {
  const dispatch = useDispatch();

  const id = `(${data.dx},${data.dy})`;
  return (
    <TooltipProvider>
      <TooltipAnchor
        render={(properties) => (
          <Button
            {...properties}
            aria-label="Move"
            aria-describedby={id}
            className="grid place-content-center bg-accent motion-safe:animate-pulse"
            onClick={() => {
              dispatch(actions.move(data));
            }}
          >
            {children}
          </Button>
        )}
      />
      <Tooltip id={id}>Move the active idol.</Tooltip>
    </TooltipProvider>
  );
}
