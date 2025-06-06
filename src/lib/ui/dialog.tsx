"use client";

import { Dialog as Primitive } from "@ariakit/react";
import type { ComponentProps, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

/**
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal}
 */
export function Dialog({
  label,
  className,
  children,
}: PropsWithChildren<{
  label: NonNullable<ComponentProps<"div">["aria-label"]>;
  className: ComponentProps<"div">["className"];
}>) {
  return (
    <Primitive
      aria-label={label}
      // aria-modal
      className="fixed m-auto inset-0 size-fit focus-visible:outline-none"
      backdrop={<div className="bg-background/75" />}
    >
      <div
        className={twMerge(
          className,
          "grid place-items-center bg-background border-4 border-foreground rounded-lg p-4 shadow-lg",
        )}
      >
        {children}
      </div>
    </Primitive>
  );
}
