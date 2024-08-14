import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { ReactQueryWrapper } from "./providers/ReactQueryWrapper";

const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nebula",
  description: "The future store.",
  icons:["/brandmark.svg"]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactQueryWrapper>
        <body className={montserrat.className}>{children}</body>
      </ReactQueryWrapper>
    </html>
  );
}
