"use client";

import { cn } from "&/cn";
import { Button } from "@ariakit/react";
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
  label: ComponentProps<"div">["aria-label"];
}>) {
  const [carousel, api] = useEmblaCarousel({ loop: true });

  return (
    <section aria-label={label} aria-roledescription="carousel" className="grid grid-flow-row gap-4">
      <div ref={carousel} className="overflow-hidden">
        <fieldset aria-roledescription="slide" aria-atomic={false} aria-live="polite" className="flex">
          {Children.toArray(children).map((child, index) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: No unique identifier.
              key={index}
              className="flex items-center justify-center grow-0 shrink-0 basis-full min-w-0"
              style={{ wordBreak: "break-word" }}
            >
              {child}
            </div>
          ))}
        </fieldset>
      </div>
      <div className="grid grid-flow-col place-content-end gap-2">
        <Arrow
          label="Previous"
          onClick={() => {
            api?.scrollPrev();
          }}
        >
          <ArrowLeftIcon />
        </Arrow>
        <Arrow
          label="Next"
          onClick={() => {
            api?.scrollNext();
          }}
        >
          <ArrowRightIcon />
        </Arrow>
      </div>
    </section>
  );
}
/**
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/button}
 */
function Arrow({
  label,
  className,
  onClick,
  children,
}: PropsWithChildren<{
  label: ComponentProps<typeof Button>["aria-label"];
  className?: ComponentProps<typeof Button>["className"];
  onClick: ComponentProps<typeof Button>["onClick"];
}>) {
  return (
    <Button
      aria-label={label}
      className={cn(
        "border-1 rounded-full focus-visible:outline-2 focus-visible:outline-secondary-foreground focus-visible:outline-offset-2 [&>svg:only]:size-5",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
