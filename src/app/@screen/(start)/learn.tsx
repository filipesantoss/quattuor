"use client";

import { Claiming } from "%/@screen/(start)/(manual)/claiming";
import { Influencing } from "%/@screen/(start)/(manual)/influencing";
import { Moving } from "%/@screen/(start)/(manual)/moving";
import { Restraining } from "%/@screen/(start)/(manual)/restraining";
import { Rewinding } from "%/@screen/(start)/(manual)/rewinding";
import { Stepping } from "%/@screen/(start)/(manual)/stepping";
import { cn } from "&/cn";
import { Carousel } from "&/ui/carousel";
import { Modal } from "&/ui/modal";
import { DialogDisclosure, DialogProvider } from "@ariakit/react";
import { InfoIcon } from "lucide-react";
import type { ComponentProps } from "react";

/**
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/button}
 */
export function Learn({
  className,
}: {
  className?: ComponentProps<typeof DialogDisclosure>["className"];
}) {
  return (
    <DialogProvider>
      <DialogDisclosure
        aria-label="Learn"
        className={cn(
          "focus-visible:outline-2 focus-visible:outline-foreground focus-visible:outline-offset-2 rounded-sm text-foreground disabled:opacity-25 p-2 grid grid-flow-col gap-x-2",
          className,
        )}
      >
        <InfoIcon />
      </DialogDisclosure>
      <Modal className="w-xs md:w-lg" label="Learn">
        <Carousel label="Manual">
          <Stepping />
          <Moving />
          <Restraining />
          <Influencing />
          <Claiming />
          <Rewinding />
        </Carousel>
      </Modal>
    </DialogProvider>
  );
}
