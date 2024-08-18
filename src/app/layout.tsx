import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ReactQueryWrapper } from "./providers/ReactQueryWrapper";
import { Navbar } from "./components/Navbar/Navbar";
import { Footer } from "./components/Footer/Footer";
import { RecoilWrapper } from "./providers/RecoilWrapper";
import { Notification } from "./components/Notification/Notification";
import { validateRequest } from "@/auth";
import { BASE_URL } from "./utils/constants";
import { GetUserApiBodyProps } from "./api/getUserDetails/route";
import { ApiDataAttributes } from "./utils/types";

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
  let userDetails;
  if (session) {
    const body: GetUserApiBodyProps = {
      userId: session?.userId!,
    };
    const res = await fetch(`${BASE_URL}/api/getUserDetails`, {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify(body),
    });
    const data: ApiDataAttributes = await res.json();
    userDetails = data.user;
  }

  return (
    <html lang="en">
      <ReactQueryWrapper>
        <RecoilWrapper>
          <body className={`${montserrat.className}  dark:text-white`}>
            <Navbar userDetails={userDetails!} session={session} />
            <Notification session={session} user={user} />
            <div className="dark:bg-[#000000]"> {children}</div>
            <Footer />
          </body>
        </RecoilWrapper>
      </ReactQueryWrapper>
    </html>
  );
}
