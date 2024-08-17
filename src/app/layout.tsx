import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ReactQueryWrapper } from "./providers/ReactQueryWrapper";
import { Navbar } from "./components/Navbar/Navbar";
import { Footer } from "./components/Footer/Footer";
import { RecoilWrapper } from "./providers/RecoilWrapper";
import { Notification } from "./components/Notification/Notification";
import { validateRequest } from "@/auth";

const montserrat = Montserrat({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Nebula Store",
  description: "The future store.",
  icons: ["/brandmark.svg"],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { session, user } = await validateRequest();
  return (
    <html lang="en">
      <ReactQueryWrapper>
        <RecoilWrapper>
          <body className={`${montserrat.className}  dark:text-white`}>
            <Navbar session={session} user={user} />
            <Notification session={session} user={user} />
            <div className="dark:bg-[#000000]"> {children}</div>
            <Footer />
          </body>
        </RecoilWrapper>
      </ReactQueryWrapper>
    </html>
  );
}
