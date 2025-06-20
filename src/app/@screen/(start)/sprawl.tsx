"use client";

import { assert } from "&/assert";
import { actions, selectors } from "&/state/puzzles";
import { useDispatch, useSelector } from "&/state/store";
import { Button } from "&/ui/button";
import { Tooltip } from "&/ui/tooltip";
import { shuffle } from "fast-shuffle";
import { PuzzleIcon } from "lucide-react";

export function Sprawl() {
  const games = useSelector((state) => selectors.unbeaten(state));
  const dispatch = useDispatch();

  return (
    <Tooltip>
      <Tooltip.Trigger asChild>
        <Button
          aria-label="Sprawl"
          disabled={games.length === 0}
          className="p-2 rounded-sm"
          onClick={() => {
            const [game] = shuffle(games);
            assert(game !== undefined);
            dispatch(actions.activate(game));
          }}
        >
          <PuzzleIcon />
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Content>
        <span>Generate a new puzzle.</span>
      </Tooltip.Content>
    </Tooltip>
  );
}
