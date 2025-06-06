"use client";

import { useDispatch, useSelector } from "&/state/store";
import { actions } from "&/state/timeline";
import { Button } from "@ariakit/react";
import { UndoIcon } from "lucide-react";

/**
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/button}
 */
export function Rewind() {
  const dispatch = useDispatch();
  const enabled = useSelector((state) => state.timeline.length > 1);

  return (
    <Button
      aria-label="Rewind"
      disabled={!enabled}
      className="rounded-sm text-secondary-foreground disabled:opacity-25 focus-visible:outline-2 focus-visible:outline-secondary-foreground focus-visible:outline-offset-2"
      onClick={() => {
        dispatch(actions.rewind());
      }}
    >
      <UndoIcon />
    </Button>
  );
}
