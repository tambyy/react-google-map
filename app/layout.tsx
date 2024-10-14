import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ract Google Map",
  description: "Use Google Map as component",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
