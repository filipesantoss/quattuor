"use client";

import { Rewind } from "%/@game/(menu)/rewind";
import { Toolbar, ToolbarProvider } from "@ariakit/react";

export function Menu() {
  return (
    <ToolbarProvider>
      <Toolbar aria-label="Menu" className="grid place-content-center bg-secondary p-2 rounded-sm grid-flow-col">
        <Rewind />
      </Toolbar>
    </ToolbarProvider>
  );
}
