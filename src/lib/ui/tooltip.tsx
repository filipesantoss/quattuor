import { cn } from "&/cn";
import { Arrow, Content, Portal, Provider, Root, Trigger } from "@radix-ui/react-tooltip";
import type { ComponentProps } from "react";

/**
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/tooltip}
 */
export function Tooltip(properties: ComponentProps<typeof Root>) {
  return (
    <Provider>
      <Root {...properties} />
    </Provider>
  );
}

Tooltip.Trigger = function TooltipTrigger(properties: ComponentProps<typeof Trigger>) {
  return <Trigger {...properties} />;
};

Tooltip.Content = function TooltipContent({ className, children, ...properties }: ComponentProps<typeof Content>) {
  return (
    <Portal>
      <Content
        {...properties}
        className={cn(
          "mb-2",
          "grid place-items-center p-4 max-w-xs md:max-w-lg",
          "bg-primary text-primary-foreground text-sm",
          "border-4 border-accent-foreground rounded-lg shadow-lg",
          "data-[state=open]:motion-safe:animate-in data-[state=open]:motion-safe:fade-in-0 data-[state=open]:motion-safe:zoom-in-95",
          "data-[state=closed]:motion-safe:animate-out data-[state=closed]:motion-safe:fade-out-0 data-[state=closed]:motion-safe:zoom-out-95",
          "data-[side=bottom]:motion-safe:slide-in-from-top-2",
          className,
        )}
      >
        {children}
        <Arrow className="bg-transparent fill-accent-foreground -translate-y-2 h-2 w-4" />
      </Content>
    </Portal>
  );
};
