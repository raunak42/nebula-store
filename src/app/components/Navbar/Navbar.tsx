"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  futureClickedState,
  galacticClickedState,
  moreClickedState,
  quantumClickedState,
  showNotificationState,
  userDetailsState,
} from "@/store";
import { Session } from "lucia";
import { PrismaUserOutput } from "@/app/utils/types";

interface NavbarProps {
  session: Session | null;
  userDetails: PrismaUserOutput;
}

export const Navbar: React.FC<NavbarProps> = ({ userDetails, session }) => {
  const [shrink, setShrink] = useState<boolean>(false);
  const [user, setUser] = useRecoilState(userDetailsState);

  const setQuantumClicked = useSetRecoilState(quantumClickedState);
  const setFutureClicked = useSetRecoilState(futureClickedState);
  const setGalacticClicked = useSetRecoilState(galacticClickedState);
  const setMoreClicked = useSetRecoilState(moreClickedState);
  const setShowNotification = useSetRecoilState(showNotificationState);

  const router = useRouter();
  const currentLocation = usePathname();
  const homeLocation = "/";

  const onScroll = () => {
    const restoreClickedState = () => {
      setQuantumClicked(false);
      setFutureClicked(false);
      setGalacticClicked(false);
      setMoreClicked(false);
    };

    restoreClickedState();

    const currentYPosition = window.scrollY;
    if (currentYPosition > 0) {
      setShrink(true);
    }
    if (currentYPosition < 40) {
      setShrink(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    setUser(userDetails);
  });

  return (
    <div
      className={`z-20 fixed top-0 w-full flex items-center justify-center transition-all duration-700 ease-in-out ${
        shrink && "p-[32px]"
      }  `}
    >
      <div
        className={` w-full shadow-md px-[12px] transition-all duration-700 ease-in-out ${
          shrink
            ? `h-[60px] rounded-full border-[1.5px] border-black  `
            : "h-[80px] rounded-none border-none"
        } flex items-center justify-between  backdrop-filter backdrop-blur-md  bg-clip-padding bg-white bg-opacity-10 dark:bg-black dark:bg-opacity-70`}
      >
        <div className=" w-[40%] flex items-center justify-center">
          <div className="flex items-center justify-center gap-[24px] text-xs">
            <button
              onClick={() => {
                window?.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className=" hover:underline cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => {
                if (currentLocation !== homeLocation) {
                  localStorage.setItem("scroll-to", "quantum");
                  window.location.assign(homeLocation); //router.push() will take you to the cached version of the page whereas, w.l.a() will take you to the page and re-render it, we want it to re-render for everything to run smoothly.
                } else {
                  setQuantumClicked(true);
                }
              }}
              className=" hover:underline cursor-pointer"
            >
              Quantum Dive
            </button>
            <button
              onClick={() => {
                if (currentLocation !== homeLocation) {
                  localStorage.setItem("scroll-to", "future");
                  window.location.assign(homeLocation); //router.push() will take you to the cached version of the page whereas, w.l.a() will take you to the page and re-render it, we want it to re-render for everything to run smoothly.
                } else {
                  setFutureClicked(true);
                }
              }}
              className=" hover:underline cursor-pointer"
            >
              Human Future
            </button>
            <button
              onClick={() => {
                if (currentLocation !== homeLocation) {
                  localStorage.setItem("scroll-to", "galactic");
                  window.location.assign(homeLocation); //router.push() will take you to the cached version of the page whereas, w.l.a() will take you to the page and re-render it, we want it to re-render for everything to run smoothly.
                } else {
                  setGalacticClicked(true);
                }
              }}
              className=" hover:underline cursor-pointer"
            >
              Galactic Urbanite
            </button>
            <button
              onClick={() => {
                if (currentLocation !== homeLocation) {
                  localStorage.setItem("scroll-to", "more");
                  window.location.assign(homeLocation); //router.push() will take you to the cached version of the page whereas, w.l.a() will take you to the page and re-render it, we want it to re-render for everything to run smoothly.
                } else {
                  setMoreClicked(true);
                }
              }}
              className=" hover:underline cursor-pointer"
            >
              More
            </button>
          </div>
        </div>
        <button
          onClick={() => {
            if (currentLocation !== homeLocation) {
              router.push(homeLocation);
            } else {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="w-fit flex items-center justify-center"
        >
          <Image
            className="transition-all duration-300"
            alt="img"
            width={shrink ? 50 : 60}
            height={shrink ? 50 : 60}
            src={"/brandmark-black.svg"}
          />
        </button>
        <div className="w-[40%] flex items-center justify-center gap-[24px]">
          <button
            onClick={() => {
              if (!session) {
                setShowNotification(true);
              } else {
                window.location.assign("/cart");
              }
            }}
            className=" w-[10%] flex items-center justify-center "
          >
            <Image alt="img" width={30} height={30} src={"/cart.svg"} />
          </button>
          <button
            onClick={() => {
              if (!session) {
                setShowNotification(true);
              }
            }}
            className=" w-[10%] flex items-center justify-center "
          >
            {!session ? (
              <Image alt="img" width={32} height={32} src={"/user.svg"} />
            ) : (
              <Image
                className="rounded-full"
                alt="img"
                width={32}
                height={32}
                src={userDetails.avatar!}
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
