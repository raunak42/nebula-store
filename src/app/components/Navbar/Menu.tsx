"use client";
import {
  futureClickedState,
  galacticClickedState,
  moreClickedState,
  quantumClickedState,
} from "@/store";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useSetRecoilState } from "recoil";

interface MenuProps {
  shrink?: boolean;
  setShrink?: Dispatch<SetStateAction<boolean>>;
  className: string;
}

export const Menu: React.FC<MenuProps> = ({ shrink, setShrink, className }) => {
  const currentLocation = usePathname();
  const homeLocation = "/";

  const setQuantumClicked = useSetRecoilState(quantumClickedState);
  const setFutureClicked = useSetRecoilState(futureClickedState);
  const setGalacticClicked = useSetRecoilState(galacticClickedState);
  const setMoreClicked = useSetRecoilState(moreClickedState);

  const onScroll = () => {
    const restoreClickedState = () => {
      setQuantumClicked(false);
      setFutureClicked(false);
      setGalacticClicked(false);
      setMoreClicked(false);
    };

    restoreClickedState();

    const currentYPosition = window.scrollY;
    if (currentYPosition > 0 && setShrink) {
      setShrink(true);
    }
    if (currentYPosition < 40 && setShrink) {
      setShrink(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
  });
  return (
    <div className={`${className}`}>
      <button
        onClick={() => {
          if (currentLocation !== homeLocation) {
            localStorage.setItem("scroll-to", "quantum");
            window.location.assign(homeLocation); //router.push() will take you to the cached version of the page whereas, w.l.a() will take you to the page and re-render it, we want it to re-render for everything to run smoothly.
          } else {
            setQuantumClicked(true);
          }
        }}
        className=" underline hover:decoration-[1.5px] hover:translate-y-[-4px] transition-all duration-200 cursor-pointer"
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
        className=" underline hover:decoration-[1.5px] hover:translate-y-[-4px] transition-all duration-200 cursor-pointer"
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
        className=" underline hover:decoration-[1.5px] hover:translate-y-[-4px] transition-all duration-200 cursor-pointer"
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
        className=" underline hover:decoration-[1.5px] hover:translate-y-[-4px] transition-all duration-200 cursor-pointer"
      >
        More
      </button>
    </div>
  );
};
