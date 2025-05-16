import "./globals.css";

import StoreProvider from "%/store.provider";
import { Geist } from "next/font/google";

const geist = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

export default function Root({
  game,
}: {
  game: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>quattuor</title>
      </head>
      <body className={`${geist.variable} bg-background antialiased h-dvh w-dvw grid place-content-center gap-y-8`}>
        <StoreProvider>{game}</StoreProvider>
      </body>
    </html>
  );
}
