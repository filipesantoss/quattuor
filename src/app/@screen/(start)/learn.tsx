"use client";

import { cn } from "&/cn";
import { Button } from "&/ui/button";
import { Carousel } from "&/ui/carousel";
import { Dialog } from "&/ui/dialog";
import { Tooltip } from "&/ui/tooltip";
import { DialogDisclosure, DialogProvider } from "@ariakit/react";
import { InfoIcon } from "lucide-react";
import type { ComponentProps } from "react";

export function Learn({
  className,
}: {
  className?: ComponentProps<typeof DialogDisclosure>["className"];
}) {
  return (
    <DialogProvider>
      <Tooltip>
        <Tooltip.Trigger asChild>
          <DialogDisclosure
            render={(properties) => (
              <Button
                {...properties}
                aria-label="Learn"
                aria-describedby="learn"
                className={cn("bg-transparent p-2 rounded-sm", className)}
              >
                <InfoIcon />
              </Button>
            )}
          />
        </Tooltip.Trigger>
        <Tooltip.Content>
          <span>Walk through the basic game mechanics.</span>
        </Tooltip.Content>
      </Tooltip>
      <Dialog className="w-xs md:w-lg text-center" label="Learn">
        <Carousel label="Manual">
          <strong>Pay attention to the possession sequence!</strong>
          <span>At the start of each turn, an idol is possessed by a beast.</span>
          <span>The beast determines how the idol can move.</span>
          <strong>When an idol moves, it exerts its influence!</strong>
          <span>Once it moves to a new field, its turn ends.</span>
          <span>Unless it moves onto a field under its influence.</span>
          <strong>Don&apos;t let your idols be restrained!</strong>
          <span>If an idol cannot make a move on its turn, the game is over.</span>
          <strong>An idol&apos;s influence protects itself!</strong>
          <span>Idols cannot move into fields under stronger opposing influence.</span>
          <span>Each time an idol moves, it extends its influence.</span>
          <strong>Free your idols!</strong>
          <span>Guide each idol to its shrine.</span>
          <span>Once an idol claims its shrine, it will no longer move.</span>
          <span>Once all idols have claimed their shrines, you win.</span>
          <strong>Made a mistake?</strong>
          <span>Rewind time to undo your last move and try a new approach.</span>
        </Carousel>
      </Dialog>
    </DialogProvider>
  );
}
