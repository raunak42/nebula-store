"use client";
import { PrismaProductOutput } from "@/app/utils/types";
import { ProductCard } from "../ProductCard.tsx/ProductCard";
import { TextAnimator } from "@/app/animators/TextAnimator/TextAnimator";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { quantumClickedState } from "@/store";
import { Session, User } from "lucia";

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
        behavior: "smooth",
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
      <div className=" w-full flex flex-row flex-wrap items-center justify-center gap-[16px] lg:gap-0 lg:justify-between sm:px-[24px] mt-[16px] ">
        {items.map((item, index) => {
          return (
            <ProductCard
              session={session}
              index={index}
              product={item}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};
