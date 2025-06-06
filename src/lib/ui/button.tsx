import { cn } from "&/cn";
import { Button as Primitive } from "@ariakit/react";
import type { ComponentProps, PropsWithChildren } from "react";

/**
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/button}
 */
export function Button({
  label,
  describedBy,
  disabled = false,
  className,
  onClick,
  children,
}: PropsWithChildren<{
  label: NonNullable<ComponentProps<"button">["aria-label"]>;
  describedBy?: ComponentProps<"button">["aria-describedby"];
  disabled?: ComponentProps<"button">["disabled"];
  className: ComponentProps<"button">["className"];
  onClick?: ComponentProps<"button">["onClick"];
}>) {
  return (
    <Primitive
      aria-label={label}
      aria-describedby={describedBy}
      disabled={disabled}
      className={cn(
        "disabled:opacity-25 focus-visible:outline-offset-2 focus-visible:outline-2 [&>svg:only:size-5]",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </Primitive>
  );
}
