import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Race Metrics Tracker",
  description: "A tool to review and modify a racecar that meets HSRA standards",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
