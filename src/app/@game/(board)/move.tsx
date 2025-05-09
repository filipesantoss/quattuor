"use client";

import type { Move as MoveProperties } from "&/entity/card";
import { actions } from "&/state/game";
import { useDispatch } from "&/state/store";
import { Button } from "@ariakit/react";
import { MoveDownIcon } from "lucide-react";
import type { PropsWithChildren } from "react";

/**
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/button/
 */
export function Move({
  data,
  children,
}: PropsWithChildren<{
  data: MoveProperties;
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
      {children ?? <MoveDownIcon className="text-red" />}
    </Button>
  );
}
