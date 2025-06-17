"use client";

import { Button } from "&/ui/button";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import type { ComponentProps, PropsWithChildren } from "react";
import { Children } from "react";

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
            >
              {child}
            </fieldset>
          ))}
        </div>
      </div>
      <div className="grid grid-flow-col place-content-end gap-2">
        <Button
          aria-label="Previous"
          className="rounded-full p-1 border-1 focus-visible:outline-secondary-foreground"
          onClick={() => {
            api?.scrollPrev();
          }}
        >
          <ArrowLeftIcon />
        </Button>
        <Button
          aria-label="Next"
          className="rounded-full p-1 border-1 focus-visible:outline-secondary-foreground"
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
