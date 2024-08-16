import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { ReactQueryWrapper } from "./providers/ReactQueryWrapper";
import { Navbar } from "./components/Navbar/Navbar";
import { Footer } from "./components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nebula Store",
  description: "The future store.",
  icons: ["/brandmark.svg"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactQueryWrapper>
        <body className={`${montserrat.className}  dark:text-white`}>
          <Navbar />
          <div className="dark:bg-[#000000]"> {children}</div>
          <Footer />
        </body>
      </ReactQueryWrapper>
    </html>
  );
}
