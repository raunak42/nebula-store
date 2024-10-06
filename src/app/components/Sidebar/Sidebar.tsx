"use client";
import { PrismaUserOutput } from "@/app/utils/types";
import { showSideBarState } from "@/store";
import { Session } from "lucia";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { Menu } from "../Navbar/Menu";
import Link from "next/link";
import { useState } from "react";

interface SidebarProps {
  session: Session | null;
  userDetails: PrismaUserOutput;
}

export const Sidebar: React.FC<SidebarProps> = ({ session, userDetails }) => {
  const [showSidebar, setShowSidebar] = useRecoilState(showSideBarState);
  return (
    <div
      className={`z-50 overflow-clip transition-all duration-300 ease-in-out fixed left-0 h-full border-r bg-white ${
        showSidebar ? "w-[300px]" : "w-0 border-none"
      }`}
    >
      <div className="w-[300px] h-full  flex flex-col items-start justify-start p-[24px] gap-[32px]">
        <div className="flex w-full flex-row items-center justify-between  ">
          <h1 className="text-2xl">Menu</h1>
          <div className="w-[30%] flex items-center justify-end gap-[8px]">
            {/* {showSpinner && (
              <Image
                alt=""
                width={24}
                height={24}
                src={"/spinner.svg"}
                className="animate-spin"
              />
            )} */}
            <button
            className="hover:translate-y-[-4px] transition-all duration-200"
              onClick={() => {
                setShowSidebar(false);
              }}
            >
              <Image alt="" width={24} height={24} src={"/cross.svg"} />
            </button>
          </div>
        </div>
        <div
          onClick={() => {
            setShowSidebar(false);
          }}
          className="w-full"
        >
          <Menu className="flex flex-col items-start justify-start  gap-[24px]" />
        </div>
        {!session ? (
          <Link
            href={"/login/google"}
            className="shadow-xl rounded-full flex items-center justify-center w-[216px] h-[36px] md:h-fit md:w-full  border-[1.5px] hover:border-[2px] border-black"
          >
            <Image
              className="visible md:hidden"
              alt="google"
              height={28}
              width={28}
              src={"/google.svg"}
            />
            <Image
              className="hidden md:block"
              alt="google"
              height={42}
              width={42}
              src={"/google.svg"}
            />
            <h1 className="md:text-base text-xs">Log in with google</h1>
          </Link>
        ) : (
          <div className="flex flex-col items-center w-full justify-center gap-[12px] ">
            <Link
              onClick={() => {
                setShowSidebar(false);
              }}
              href={"/cart"}
              className="w-[200px] h-[50px] bg-white border-[1.5px] border-black rounded-full flex items-center justify-center hover:translate-y-[-4px] transition-all duration-200"
            >
              View cart
            </Link>
            <Link
              onClick={() => {
                setShowSidebar(false);
              }}
              href={"/signout"}
              className="w-[200px] h-[50px] bg-black text-white border-[1.5px] border-black rounded-full flex items-center justify-center hover:translate-y-[-4px] transition-all duration-200"
            >
              Sign out
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
