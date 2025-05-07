import { Geist } from "next/font/google";

import "./globals.css";

const geist = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

export default function Root({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Quattuor</title>
      </head>
      <body className={`${geist.variable} bg-background antialiased h-dvh w-dvw`}>{children}</body>
    </html>
  );
}
