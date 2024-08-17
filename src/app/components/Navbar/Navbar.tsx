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
} from "@/store";
import { Session, User } from "lucia";

interface NavbarProps {
  session: Session | null;
  user: User | null;
}

export const Navbar: React.FC<NavbarProps> = ({ session, user }) => {
  const [shrink, setShrink] = useState<boolean>(false);

  const [quantumCLicked, setQuantumClicked] =
    useRecoilState(quantumClickedState);
  const [futureClicked, setFutureClicked] = useRecoilState(futureClickedState);
  const [galacticClicked, setGalacticClicked] =
    useRecoilState(galacticClickedState);
  const [moreClicked, setMoreClicked] = useRecoilState(moreClickedState);

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
  });

  return (
    <div
      className={`z-10 fixed top-0 w-full flex items-center justify-center transition-all duration-700 ease-in-out ${
        shrink && "p-[32px]"
      }  `}
    >
      <div
        className={` w-full shadow-2xl px-[12px] transition-all duration-700 ease-in-out ${
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
              }
            }}
            className=" w-[10%] flex items-center justify-center"
          >
            <Image alt="img" width={30} height={30} src={"/cart.svg"} />
          </button>
          <button
            onClick={() => setShowNotification(true)}
            className=" w-[10%] flex items-center justify-center"
          >
            <Image alt="img" width={32} height={32} src={"/user.svg"} />
          </button>
        </div>
      </div>
    </div>
  );
};
