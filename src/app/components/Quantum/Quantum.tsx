"use client";
import { PrismaProductOutput } from "@/app/utils/types";
import { ProductCard } from "../ProductCard.tsx/ProductCard";
import { TextAnimator } from "@/app/animators/TextAnimator/TextAnimator";

interface QuantumProps {
  items: PrismaProductOutput[];
}

export const Quantum: React.FC<QuantumProps> = ({ items }) => {
  return (
    <div id="quantum">
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
          return (
              <ProductCard index={index} item={item} key={index} />
          );
        })}
      </div>
    </div>
  );
};
