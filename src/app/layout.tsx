import "./globals.css";

import StoreProvider from "%/store.provider";
import { Geist } from "next/font/google";

const geist = Geist({
  variable: "--font-sans",
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
        className={`${geist.variable} bg-background text-foreground antialiased h-dvh w-dvw grid place-content-center`}
      >
        <StoreProvider>{screen}</StoreProvider>
      </body>
    </html>
  );
}
