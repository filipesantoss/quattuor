import "./globals.css";

import StoreProvider from "%/store.provider";
import { Geist } from "next/font/google";

const geist = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

export default function Root({
  board,
}: Readonly<{
  board: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>quattuor</title>
      </head>
      <body className={`${geist.variable} bg-background antialiased h-dvh w-dvw grid place-content-center`}>
        <StoreProvider>{board}</StoreProvider>
      </body>
    </html>
  );
}
