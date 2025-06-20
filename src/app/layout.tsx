import "./globals.css";

import StoreProvider from "%/store.provider";
import { cn } from "&/cn";
import { Inter, Noto_Sans } from "next/font/google";

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const noto = Noto_Sans({
  variable: "--font-noto",
  subsets: ["latin"],
});

export default function Root({
  screen,
}: {
  screen: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>quattuor</title>
      </head>
      <body
        className={cn(
          sans.variable,
          noto.variable,
          "antialiased bg-background text-foreground h-dvh w-dvw grid place-content-center",
        )}
      >
        <StoreProvider>{screen}</StoreProvider>
      </body>
    </html>
  );
}
