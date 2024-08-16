"use client";
import Image from "next/image";
import { ProductCard } from "../ProductCard.tsx/ProductCard";
import { PrismaProductOutput } from "@/app/utils/types";
import { TextAnimator } from "@/app/animators/TextAnimator/TextAnimator";

interface GalacticProps {
  items: PrismaProductOutput[];
}

export const Galactic: React.FC<GalacticProps> = ({ items }) => {
  return (
    <div id="galactic" className=" flex flex-col items-center w-full">
      <div className="relative w-full flex items-center justify-center">
        <div className="absolute inset-0 w-full flex items-center justify-center">
          <h1 className=" w-[70%] ">
            <TextAnimator
              classname="text-8xl text-[#ffffff] text-shadow font-semibold flex justify-center"
              space={20}
              text="The Galactic Urbanite Collection."
            />
          </h1>
        </div>
        <Image height={100} width={1600} alt="img" src={"/banner8.png"} />
      </div>{" "}
      <div className="mt-[40px]">
        <div className="flex flex-col items-center">
          <h1 className="text-5xl w-[70%] text-center">
            In a Galaxy Far Far Away
          </h1>
          <div className=" w-full flex flex-row flex-wrap items-center justify-center gap-[12px] mt-[16px] px-[12px] ">
            {items.map((item, index) => {
              return <ProductCard index={index} item={item} key={index} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
