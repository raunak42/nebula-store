"use client";
import { PrismaProductOutput } from "@/app/utils/types";
import { ProductCard } from "../ProductCard.tsx/ProductCard";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { moreClickedState } from "@/store";

interface HighlightsProps {
  items: PrismaProductOutput[];
}

export const Highlights: React.FC<HighlightsProps> = ({ items }) => {
  const moreRef = useRef<HTMLDivElement | null>(null);
  const [moreClicked, setMoreClicked] = useRecoilState(moreClickedState);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const moreElement = moreRef.current;
    const scrollTo = localStorage.getItem("scroll-to");

    if (scrollTo === "more" || moreClicked) {
      moreElement?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [moreClicked]);

  useEffect(() => {
    const moreElement = moreRef.current;
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    });

    if (moreElement) observer.observe(moreElement);

    if (isIntersecting) {
      localStorage.clear();
    }
    return () => {
      if (moreElement) observer.unobserve(moreElement);
    };
  }, [isIntersecting]);

  return (
    <div ref={moreRef} id="more">
      <div className="w-full flex flex-col items-center justify-center gap-[8px]">
        <h1 className="text-3xl underline decoration-dotted ">
          Explore more products:
        </h1>
      </div>
      <div className=" w-full flex flex-row flex-wrap items-center justify-between px-[24px] mt-[16px] ">
        {items.map((item, index) => {
          return <ProductCard index={index} product={item} key={index} />;
        })}
      </div>
    </div>
  );
};
