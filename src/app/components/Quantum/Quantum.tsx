"use client";
import { PrismaProductOutput } from "@/app/utils/types";
import { ProductCard } from "../ProductCard.tsx/ProductCard";
import { TextAnimator } from "@/app/animators/TextAnimator/TextAnimator";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { quantumClickedState } from "@/store";

interface QuantumProps {
  items: PrismaProductOutput[];
}

export const Quantum: React.FC<QuantumProps> = ({ items }) => {
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
          classname="text-5xl "
          text="The Quantum Dive:"
          space={10}
        />
        <TextAnimator
          classname="text-2xl "
          text="Ultimate Collection"
          space={10}
        />
      </div>
      <div className=" w-full flex flex-row flex-wrap items-center justify-between px-[24px] mt-[16px] ">
        {items.map((item, index) => {
          return <ProductCard index={index} product={item} key={index} />;
        })}
      </div>
    </div>
  );
};
