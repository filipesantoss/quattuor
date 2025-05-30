"use client";

import { useDispatch, useSelector } from "&/state/store";
import { actions } from "&/state/timeline";
import { ToolbarItem } from "@ariakit/react";
import { UndoIcon } from "lucide-react";

export function Rewind() {
  const dispatch = useDispatch();
  const enabled = useSelector((state) => state.timeline.length > 1);

  return (
    <ToolbarItem
      aria-label="Rewind"
      disabled={!enabled}
      className="focus-visible:outline-none focus-visible:ring-2 rounded-sm text-secondary-foreground disabled:text-primary"
      onClick={() => {
        dispatch(actions.rewind());
      }}
    >
      <UndoIcon />
    </ToolbarItem>
  );
}
