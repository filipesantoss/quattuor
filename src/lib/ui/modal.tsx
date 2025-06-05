"use client";

import { Dialog } from "@ariakit/react";
import type { ComponentProps, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

/**
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal}
 */
export function Modal({
  label,
  className,
  children,
}: PropsWithChildren<{
  label: ComponentProps<"div">["className"];
  className: ComponentProps<typeof Dialog>["aria-label"];
}>) {
  return (
    <Dialog
      aria-label={label}
      aria-modal
      className="fixed m-auto inset-0 size-fit focus-visible:outline-none"
      backdrop={<div className="bg-background/40" />}
    >
      <div
        className={twMerge(
          className,
          "grid place-items-center bg-background border-4 border-foreground rounded-lg p-4 shadow-lg",
        )}
      >
        {children}
      </div>
    </Dialog>
  );
}
