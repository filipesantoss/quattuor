import { cn } from "&/cn";
import { Button as Primitive } from "@ariakit/react";
import type { ComponentProps } from "react";

/**
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/button}
 */
export function Button({
  disabled = false,
  className,
  autoFocus = false,
  children,
  ...props
}: ComponentProps<"button">) {
  return (
    <Primitive
      {...props}
      disabled={disabled}
      autoFocus={autoFocus}
      className={cn(
        "disabled:opacity-25 focus-visible:outline-offset-2 focus-visible:outline-2 [&>svg]:size-5",
        className,
      )}
    >
      {children}
    </Primitive>
  );
}
