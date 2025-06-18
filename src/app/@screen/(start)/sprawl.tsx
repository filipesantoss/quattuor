"use client";

import { assert } from "&/assert";
import { actions, selectors } from "&/state/puzzles";
import { useDispatch, useSelector } from "&/state/store";
import { Button } from "&/ui/button";
import { Tooltip } from "&/ui/tooltip";
import { TooltipAnchor, TooltipProvider } from "@ariakit/react";
import { shuffle } from "fast-shuffle";
import { PuzzleIcon } from "lucide-react";

export function Sprawl() {
  const games = useSelector((state) => selectors.unbeaten(state));
  const dispatch = useDispatch();

  return (
    <TooltipProvider>
      <TooltipAnchor
        render={(properties) => (
          <Button
            {...properties}
            aria-label="Sprawl"
            aria-describedby="sprawl"
            disabled={games.length === 0}
            className="p-2 rounded-sm text-foreground border-1 focus-visible:outline-foreground"
            onClick={() => {
              const [game] = shuffle(games);
              assert(game !== undefined);
              dispatch(actions.activate(game));
            }}
          >
            <PuzzleIcon />
          </Button>
        )}
      />
      <Tooltip id="sprawl">
        <span>Generate a new puzzle.</span>
      </Tooltip>
    </TooltipProvider>
  );
}
