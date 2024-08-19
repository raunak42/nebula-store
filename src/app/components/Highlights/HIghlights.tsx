"use client";
import { PrismaProductOutput } from "@/app/utils/types";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { moreClickedState } from "@/store";
import { Session } from "lucia";
import { RowTypeA } from "../RowTypes/RowTypeA";

interface HighlightsProps {
  items: PrismaProductOutput[];
  session: Session | null;
}

export const Highlights: React.FC<HighlightsProps> = ({ items, session }) => {
  const moreRef = useRef<HTMLDivElement | null>(null);
  const [moreClicked, setMoreClicked] = useRecoilState(moreClickedState);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const moreElement = moreRef.current;
    const scrollTo = localStorage.getItem("scroll-to");

    if (scrollTo === "more" || moreClicked) {
      moreElement?.scrollIntoView({
        behavior: moreClicked ? "smooth" : "instant",
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
      <RowTypeA items={items} session={session} />
    </div>
  );
};
