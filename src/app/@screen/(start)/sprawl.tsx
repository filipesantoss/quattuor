"use client";

import { cn } from "&/cn";
import type { Game } from "&/entity/game";
import { actions } from "&/state/game";
import { useDispatch } from "&/state/store";
import { Button } from "&/ui/button";
import { Tooltip } from "&/ui/tooltip";
import { TooltipAnchor, TooltipProvider } from "@ariakit/react";
import { PuzzleIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function Sprawl() {
  const [sprawling, setSprawling] = useState(false);
  const dispatch = useDispatch();
  const worker = useRef<Worker | null>(null);

  useEffect(() => {
    worker.current = new Worker(new URL("./sprawl.worker.ts", import.meta.url));

    worker.current.onmessage = ({ data }) => {
      dispatch(actions.sprawl(data as Game));
    };

    return () => {
      worker.current?.terminate();
    };
  }, [dispatch]);

  return (
    <TooltipProvider>
      <TooltipAnchor
        render={(properties) => (
          <Button
            {...properties}
            aria-label="Sprawl"
            aria-describedby="sprawl"
            disabled={sprawling}
            className="p-2 rounded-sm text-foreground border-1 focus-visible:outline-foreground"
            onClick={() => {
              setSprawling(true);
              worker.current?.postMessage(null);
            }}
          >
            <PuzzleIcon
              className={cn({
                "motion-safe:animate-spin": sprawling,
              })}
            />
          </Button>
        )}
      />
      <Tooltip id="sprawl">
        <span>Generate a new puzzle.</span>
      </Tooltip>
    </TooltipProvider>
  );
}
