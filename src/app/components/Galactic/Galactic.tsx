"use client";
import Image from "next/image";
import { PrismaProductOutput } from "@/app/utils/types";
import { TextAnimator } from "@/app/animators/TextAnimator/TextAnimator";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { galacticClickedState } from "@/store";
import { Session } from "lucia";
import { RowTypeB } from "../RowTypes/RowTypeB";

interface GalacticProps {
  items: PrismaProductOutput[];
  session: Session | null;
}

export const Galactic: React.FC<GalacticProps> = ({ items, session }) => {
  const galacticRef = useRef<HTMLDivElement | null>(null);
  const [galacticClicked, setGalacticClicked] =
    useRecoilState(galacticClickedState);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const galacticElement = galacticRef.current;
    const scrollTo = localStorage.getItem("scroll-to");

    if (scrollTo === "galactic" || galacticClicked) {
      galacticElement?.scrollIntoView({
        behavior: galacticClicked ? "smooth" : "instant",
        block: "start",
      });
    }
  }, [galacticClicked]);

  useEffect(() => {
    const galacticElement = galacticRef.current;
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    });
    if (galacticElement) observer.observe(galacticElement);

    if (isIntersecting) {
      localStorage.clear();
    }

    return () => {
      if (galacticElement) observer.unobserve(galacticElement);
    };
  }, [isIntersecting]);

  return (
    <div
      ref={galacticRef}
      id="galactic"
      className=" flex flex-col items-center w-full"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full flex items-center justify-center"
      >
        <div className="absolute inset-0 w-full flex items-center justify-center">
          <h1 className=" w-[70%] ">
            <TextAnimator
              classname="text-3xl sm:text-6xl lg:text-8xl text-[#ffffff] text-shadow font-semibold flex justify-center"
              space={20}
              text="The Galactic Urbanite Collection."
            />
          </h1>
        </div>
        <Image height={100} width={1600} alt="img" src={"/banner8.png"} />
      </motion.div>{" "}
      <div className="mt-[40px]">
        <div className="flex flex-col items-center">
          <div className="w-full flex flex-col items-center justify-center gap-[8px]">
            <TextAnimator
              classname="text-3xl sm:text-4xl md:text-5xl "
              text="A Long Time Ago:"
              space={10}
            />
            <TextAnimator
              classname="text-xl sm:text-2xl "
              text="In a Galaxy Far, Far Away"
              space={10}
            />
          </div>
          <RowTypeB items={items} session={session} />
        </div>
      </div>
    </div>
  );
};
