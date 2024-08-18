"use client";
import { PrismaProductOutput } from "@/app/utils/types";
import { ProductCard } from "../ProductCard.tsx/ProductCard";
import { useRecoilState } from "recoil";
import { futureClickedState } from "@/store";
import { useEffect, useRef, useState } from "react";
import { Session } from "lucia";

interface FutureProps {
  items: PrismaProductOutput[];
  session: Session | null;
}

export const Future: React.FC<FutureProps> = ({ items,session }) => {
  const futureRef = useRef<HTMLDivElement | null>(null);
  const [futureClicked, setFutureClicked] = useRecoilState(futureClickedState);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const futureElement = futureRef.current;
    const scrollTo = localStorage.getItem("scroll-to");

    if (scrollTo === "future" || futureClicked) {
      futureElement?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [futureClicked]);

  useEffect(() => {
    const futureElement = futureRef.current;
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    });
    if (futureElement) observer.observe(futureElement);

    if (isIntersecting) {
      localStorage.clear();
    }
    return () => {
      if (futureElement) observer.unobserve(futureElement);
    };
  }, [isIntersecting]);

  return (
    <div ref={futureRef} id="future" className="flex flex-col items-center">
      <div className="w-full flex flex-col items-center justify-center gap-[8px]">
        <h1 className="text-3xl sm:text-4xl md:text-5xl">The Human Future:</h1>
        <h3 className="text-xl sm:text-2xl">Time Travellers Collection</h3>
      </div>
      <div className=" w-full flex flex-row flex-wrap items-center justify-center gap-[16px] lg:gap-[12px] mt-[16px] px-[12px] ">
        {items.map((item, index) => {
          return <ProductCard session={session} index={index} product={item} key={index} />;
        })}
      </div>
    </div>
  );
};
