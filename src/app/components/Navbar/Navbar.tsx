"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export const Navbar: React.FC = () => {
  const [shrink, setShrink] = useState<boolean>(false);

  const onScroll = () => {
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
  }, []);

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
                const futureElement = document.getElementById("quantum");
                futureElement?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className=" hover:underline cursor-pointer"
            >
              Quantum Dive
            </button>
            <button
              onClick={() => {
                const futureElement = document.getElementById("future");
                futureElement?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className=" hover:underline cursor-pointer"
            >
              Human Future
            </button>
            <button
              onClick={() => {
                const futureElement = document.getElementById("galactic");
                futureElement?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className=" hover:underline cursor-pointer"
            >
              Galactic Urbanite
            </button>
            <button
              onClick={() => {
                const futureElement = document.getElementById("more");
                futureElement?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className=" hover:underline cursor-pointer"
            >
              More
            </button>
          </div>
        </div>
        <div className="w-[20%] flex items-center justify-center">
          <Image
            className="transition-all duration-300"
            alt="img"
            width={shrink ? 50 : 60}
            height={shrink ? 50 : 60}
            src={"/brandmark-black.svg"}
          />
        </div>
        <div className="w-[40%] flex items-center justify-center gap-[24px]">
          <button className=" w-[10%] flex items-center justify-center">
            {" "}
            <Image alt="img" width={32} height={32} src={"/user.svg"} />
          </button>
          <button className=" w-[10%] flex items-center justify-center">
            {" "}
            <Image alt="img" width={30} height={30} src={"/cart.svg"} />
          </button>
          <button className=" w-[10%] flex items-center justify-center">
            {" "}
            <Image alt="img" width={34} height={34} src={"/heart.svg"} />
          </button>
        </div>
      </div>
    </div>
  );
};
