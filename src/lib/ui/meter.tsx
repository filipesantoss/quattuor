import { cn } from "&/cn";
import { Indicator, Root } from "@radix-ui/react-progress";
import type { ComponentProps } from "react";

/**
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/meter}
 */
export function Meter({ className, value, ...properties }: ComponentProps<typeof Root>) {
  return (
    <Root {...properties} className={cn("relative overflow-hidden bg-accent/25 rounded-full h-2", className)}>
      <Indicator className="size-full bg-accent" style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }} />
    </Root>
  );
}
