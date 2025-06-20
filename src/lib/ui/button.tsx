import { cn } from "&/cn";
import type { ComponentProps } from "react";

/**
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/button}
 */
export function Button(properties: ComponentProps<"button">) {
  return (
    <button
      {...properties}
      className={cn(
        "bg-background text-foreground",
        "border-1 border-foreground",
        "focus-visible:outline-offset-2 focus-visible:outline-2 focus-visible:outline-foreground",
        "disabled:opacity-25",
        "[&>svg]:size-5",
        properties.className,
      )}
    />
  );
}
