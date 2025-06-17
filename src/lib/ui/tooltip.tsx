"use client";

import { Tooltip as Primitive, TooltipArrow } from "@ariakit/react";
import type { ComponentProps, PropsWithChildren } from "react";

/**
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/tooltip}
 */
export function Tooltip({
  id,
  children,
}: PropsWithChildren<{
  id: NonNullable<ComponentProps<"div">["id"]>;
}>) {
  return (
    <Primitive
      id={id}
      className="grid place-items-center bg-primary border-4 border-accent-foreground text-sm text-primary-foreground rounded-lg p-4 shadow-lg max-w-xs md:max-w-lg"
    >
      <TooltipArrow className="[&>svg]:fill-primary [&>svg]:stroke-accent-foreground" />
      {children}
    </Primitive>
  );
}
