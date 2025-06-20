"use client";

import { cn } from "&/cn";
import { Content, Overlay, Portal, Root, Title, Trigger } from "@radix-ui/react-dialog";

export function Dialog(properties: React.ComponentProps<typeof Root>) {
  return <Root {...properties} />;
}

Dialog.Trigger = function DialogTrigger(properties: React.ComponentProps<typeof Trigger>) {
  return <Trigger {...properties} />;
};

Dialog.Content = function DialogContent({ className, ...properties }: React.ComponentProps<typeof Content>) {
  return (
    <Portal>
      <Overlay
        className={cn(
          "bg-background/75",
          "data-[state=open]:motion-safe:animate-in data-[state=open]:motion-safe:fade-in-0",
          "data-[state=closed]:motion-safe:animate-out data-[state=closed]:motion-safe:fade-out-0",
        )}
      />
      <Content
        aria-describedby={undefined}
        {...properties}
        className={cn(
          "fixed inset-0 m-auto",
          "grid place-items-center p-4 size-fit",
          "bg-background",
          "border-4 border-foreground rounded-lg shadow-lg",
          "focus-visible:outline-none",
          "data-[state=open]:motion-safe:animate-in data-[state=open]:motion-safe:fade-in-0 data-[state=open]:motion-safe:zoom-in-95",
          "data-[state=closed]:motion-safe:animate-out data-[state=closed]:motion-safe:fade-out-0 data-[state=closed]:motion-safe:zoom-out-95",
          className,
        )}
      />
    </Portal>
  );
};

Dialog.Title = function DialogTitle(properties: React.ComponentProps<typeof Title>) {
  return <Title {...properties} />;
};
