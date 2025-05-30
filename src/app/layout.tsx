import "./globals.css";

import StoreProvider from "%/store.provider";
import { Geist, Noto_Serif_JP } from "next/font/google";

const geist = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

// @ts-ignore: Font loaders must be assigned to a const in the module scope.
const noto = Noto_Serif_JP({
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
        className={`antialiased ${geist.variable} bg-background text-foreground h-dvh w-dvw grid place-content-center`}
      >
        <StoreProvider>{screen}</StoreProvider>
      </body>
    </html>
  );
}
