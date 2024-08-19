"use client";
import { PrismaProductOutput } from "@/app/utils/types";
import { TextAnimator } from "@/app/animators/TextAnimator/TextAnimator";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { quantumClickedState } from "@/store";
import { Session } from "lucia";
import { RowTypeA } from "../RowTypes/RowTypeA";

interface QuantumProps {
  items: PrismaProductOutput[];
  session: Session | null;
}

export const Quantum: React.FC<QuantumProps> = ({ items, session }) => {
  const quantumRef = useRef<HTMLDivElement | null>(null);
  const [quantumClicked, setQuantumClicked] =
    useRecoilState(quantumClickedState);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const quantumElement = quantumRef.current;
    const scrollTo = localStorage.getItem("scroll-to");

    if (scrollTo === "quantum" || quantumClicked) {
      quantumElement?.scrollIntoView({
        behavior: quantumClicked ? "smooth" : "instant",
        block: "start",
      });
    }
  }, [quantumClicked]);

  useEffect(() => {
    const quantumElement = quantumRef.current;
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    });
    if (quantumElement) observer.observe(quantumElement);

    if (isIntersecting) {
      localStorage.clear();
    }
    return () => {
      if (quantumElement) observer.unobserve(quantumElement);
    };
  }, [isIntersecting]);

  return (
    <div ref={quantumRef} id="quantum" className="mt-[-60px]">
      <div className="w-full flex flex-col items-center justify-center gap-[8px]">
        <TextAnimator
          classname="text-3xl sm:text-4xl md:text-5xl "
          text="The Quantum Dive:"
          space={10}
        />
        <TextAnimator
          classname=" text-xl sm:text-2xl "
          text="Ultimate Collection"
          space={10}
        />
      </div>
      <RowTypeA session={session} items={items} />
    </div>
  );
};
