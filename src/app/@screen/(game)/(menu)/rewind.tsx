"use client";

import { useDispatch, useSelector } from "&/state/store";
import { actions } from "&/state/timeline";
import { Button } from "&/ui/button";
import { UndoIcon } from "lucide-react";

export function Rewind() {
  const dispatch = useDispatch();
  const enabled = useSelector((state) => state.timeline.length > 1);

  return (
    <Button
      aria-label="Rewind"
      disabled={!enabled}
      className="p-2 rounded-sm text-secondary-foreground focus-visible:outline-secondary-foreground"
      onClick={() => {
        dispatch(actions.rewind());
      }}
    >
      <UndoIcon />
    </Button>
  );
}
