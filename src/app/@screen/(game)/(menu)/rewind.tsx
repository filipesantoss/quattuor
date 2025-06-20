"use client";

import { useDispatch, useSelector } from "&/state/store";
import { actions } from "&/state/timeline";
import { Button } from "&/ui/button";
import { Tooltip } from "&/ui/tooltip";
import { UndoIcon } from "lucide-react";

export function Rewind() {
  const dispatch = useDispatch();
  const enabled = useSelector((state) => state.timeline.length > 1);

  return (
    <Tooltip>
      <Tooltip.Trigger asChild>
        <Button
          aria-label="Rewind"
          disabled={!enabled}
          className="bg-transparent border-none p-2 rounded-sm"
          onClick={() => {
            dispatch(actions.rewind());
          }}
        >
          <UndoIcon />
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Content>
        <span>Undo your last movement.</span>
      </Tooltip.Content>
    </Tooltip>
  );
}
