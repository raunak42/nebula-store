"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  getFreshCartBadgeState,
  showNotificationState,
  showSideBarState,
  userDetailsState,
} from "@/store";
import { Session } from "lucia";
import { ApiDataAttributes, PrismaUserOutput } from "@/app/utils/types";
import { Menu } from "./Menu";
import { BASE_URL } from "@/app/utils/constants";

interface NavbarProps {
  session: Session | null;
  userDetails: PrismaUserOutput;
}

export const Navbar: React.FC<NavbarProps> = ({ userDetails, session }) => {
  const [shrink, setShrink] = useState<boolean>(false);
  const setShowNotification = useSetRecoilState(showNotificationState);
  const [showSidebar, setShowSidebar] = useRecoilState(showSideBarState);
  const [user, setUser] = useRecoilState(userDetailsState);
  const [showSpinner, setShowSpinner] = useState<boolean>(false);
  const [getFreshCartBadge, setGetFreshCartBadge] = useRecoilState(
    getFreshCartBadgeState
  );
  const [showCartSpinner, setShowCartSpinner] = useState<boolean>(false);

  const router = useRouter();
  const currentLocation = usePathname();
  const homeLocation = "/";

  useEffect(() => {
    setUser(userDetails);
  }, [setUser, userDetails]);

  useEffect(() => {
    if (!user) {
      return;
    }

    const getUserDetails = async () => {
      setShowCartSpinner(true);
      const res = await fetch(`${BASE_URL}/api/getUserDetails`, {
        method: "POST",
        cache: "no-store",
        body: JSON.stringify({ userId: user.id }),
      });
      const data: ApiDataAttributes = await res.json();
      if (data.user) {
        setUser(data.user);
        setShowCartSpinner(false);
      }
    };
    if (getFreshCartBadge) {
      getUserDetails();
      setGetFreshCartBadge(false);
    }
  }, [user, setUser, getFreshCartBadge, setGetFreshCartBadge]);

  return (
    <div
      className={`z-20 fixed top-0  w-full flex items-center justify-center transition-all duration-700 ease-in-out ${
        shrink && "p-[32px]"
      }  `}
    >
      <div
        className={` w-full shadow-md px-[32px] md:px-[64px] transition-all duration-700 ease-in-out ${
          shrink
            ? `h-[60px] rounded-full border-[1.5px] border-black  `
            : "h-[80px] rounded-none border-none"
        } flex items-center justify-between  backdrop-filter backdrop-blur-md  bg-clip-padding bg-white bg-opacity-10 dark:bg-black dark:bg-opacity-70`}
      >
        <div className=" w-[45%]  h-full flex items-center justify-between gap-[24px] md:gap-[48px] ">
          <button
            onClick={() => {
              setShowSidebar(true);
            }}
            className=" visible xl:hidden hover:translate-y-[-4px] transition-all duration-200"
          >
            <Image alt="" width={26} height={26} src={"/hamburger.svg"} />
          </button>
          <div
            onClick={() => {
              if (currentLocation !== homeLocation) {
                setShowSpinner(true);
              }
            }}
            className="hidden xl:flex items-center justify-center  text-xs"
          >
            <Menu
              shrink={shrink}
              setShrink={setShrink}
              className="flex items-center justify-center gap-[24px] text-xs"
            />
          </div>
          {showSpinner && (
            <Image
              alt=""
              width={24}
              height={24}
              src={"/spinner.svg"}
              className="animate-spin"
            />
          )}
        </div>
        <div className="w-[20%] h-full  flex items-center justify-center  ">
          <button
            onClick={() => {
              if (currentLocation !== homeLocation) {
                router.push(homeLocation);
              } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="w-fit hover:translate-y-[-4px] transition-all duration-200 flex items-center justify-center  rounded-full "
          >
            <Image
              className="transition-all duration-300"
              alt="img"
              width={shrink ? 50 : 60}
              height={shrink ? 50 : 60}
              src={"/brandmark-black.svg"}
            />
          </button>
        </div>

        <div
          className={`w-[45%] h-full flex items-center justify-end gap-[22px] md:gap-[48px] `}
        >
          <button
            onClick={() => {
              if (!session) {
                setShowNotification(true);
              } else {
                setShowSpinner(true);
                window.location.assign("/cart");
              }
            }}
            className="relative hover:translate-y-[-4px] transition-all duration-200"
          >
            <Image
              className="hidden md:block"
              alt="img"
              width={30}
              height={30}
              src={"/cart.svg"}
            />
            <Image
              className="visible md:hidden"
              alt="img"
              width={24}
              height={24}
              src={"/cart.svg"}
            />
            {user && (
              <div className="absolute inset-0 h-full w-full  flex items-start justify-end ">
                <div className="rounded-full size-[18px] bg-black flex items-center justify-center text-white text-xs">
                  {showCartSpinner ? (
                    <Image
                      className="animate-spin"
                      alt=""
                      width={16}
                      height={16}
                      src={"/spinner-white.svg"}
                    />
                  ) : (
                    <h1>{user?.cart?.length}</h1>
                  )}
                </div>
              </div>
            )}
          </button>
          <button
            onClick={() => {
              setShowSidebar(true);
            }}
            className="hover:translate-y-[-4px] transition-all duration-200 "
          >
            {!session ? (
              <div>
                <Image
                  className="hidden md:block"
                  alt="img"
                  width={32}
                  height={32}
                  src={"/user.svg"}
                />
                <Image
                  className="visible md:hidden"
                  alt="img"
                  width={28}
                  height={28}
                  src={"/user.svg"}
                />
              </div>
            ) : (
              <div>
                <Image
                  className="hidden md:block rounded-full"
                  alt="img"
                  width={32}
                  height={32}
                  src={userDetails?.avatar!}
                />
                <Image
                  className="visible md:hidden rounded-full"
                  alt="img"
                  width={28}
                  height={28}
                  src={userDetails?.avatar!}
                />
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
