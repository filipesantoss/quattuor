"use client";

import { cn } from "&/cn";
import type { Game } from "&/entity/game";
import { actions } from "&/state/game";
import { useDispatch } from "&/state/store";
import { Button } from "@ariakit/react";
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
    <Button
      aria-label="Sprawl"
      disabled={sprawling}
      className="focus-visible:outline-none focus-visible:ring-2 rounded-sm text-primary-foreground disabled:text-primary"
      onClick={() => {
        setSprawling(true);
        worker.current?.postMessage(null);
      }}
    >
      <PuzzleIcon className={cn({ "motion-safe:animate-spin": sprawling })} />
    </Button>
  );
}
