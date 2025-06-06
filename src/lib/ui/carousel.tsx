"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import type { ComponentProps, PropsWithChildren } from "react";
import { Children } from "react";
import { Button } from "./button";

/**
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/carousel}
 */
export function Carousel({
  label,
  children,
}: PropsWithChildren<{
  label: NonNullable<ComponentProps<"section">["aria-label"]>;
}>) {
  const [carousel, api] = useEmblaCarousel({ loop: true });

  return (
    <section aria-label={label} aria-roledescription="carousel" className="grid grid-flow-row gap-4">
      <div ref={carousel} className="overflow-hidden">
        <div className="flex">
          {Children.toArray(children).map((child, index) => (
            <fieldset
              // biome-ignore lint/suspicious/noArrayIndexKey: No unique identifier.
              key={index}
              aria-roledescription="slide"
              aria-atomic={false}
              aria-live="polite"
              className="flex items-center justify-center grow-0 shrink-0 basis-full min-w-0"
              style={{ wordBreak: "break-word" }}
            >
              {child}
            </fieldset>
          ))}
        </div>
      </div>
      <div className="grid grid-flow-col place-content-end gap-2">
        <Button
          label="Previous"
          className="border-1 rounded-full focus-visible:outline-secondary-foreground"
          onClick={() => {
            api?.scrollPrev();
          }}
        >
          <ArrowLeftIcon />
        </Button>
        <Button
          label="Next"
          className="border-1 rounded-full focus-visible:outline-secondary-foreground"
          onClick={() => {
            api?.scrollNext();
          }}
        >
          <ArrowRightIcon />
        </Button>
      </div>
    </section>
  );
}
