"use client";

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
    <section
      aria-label={label}
      aria-roledescription="carousel"
      className="w-full grid grid-flow-col place-items-center place-content-between"
    >
      <Arrow
        label="Previous"
        onClick={() => {
          api?.scrollPrev();
        }}
      >
        <ArrowLeftIcon />
      </Arrow>
      <div ref={carousel} className="max-w-full overflow-hidden">
        <fieldset aria-roledescription="slide" aria-atomic={false} aria-live="polite" className="flex">
          {Children.toArray(children).map((child, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: No unique identifier.
            <div key={index} className="flex grow-0 shrink-0 basis-full" style={{ wordBreak: "break-word" }}>
              {child}
            </div>
          ))}
        </fieldset>
      </div>
      <Arrow
        label="Next"
        onClick={() => {
          api?.scrollNext();
        }}
      >
        <ArrowRightIcon />
      </Arrow>
    </section>
  );
}
/**
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/button}
 */
function Arrow({
  label,
  onClick,
  children,
}: PropsWithChildren<{
  label: ComponentProps<typeof Button>["aria-label"];
  onClick: ComponentProps<typeof Button>["onClick"];
}>) {
  return (
    <Button
      aria-label={label}
      className="p-4 focus-visible:outline-2 focus-visible:outline-secondary-foreground focus-visible:outline-offset-2 rounded-sm [&>svg:only]:size-4"
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
