"use client";
import { TextAnimator } from "@/app/animators/TextAnimator/TextAnimator";
import Image from "next/image";

export const Banner: React.FC = () => {
  return (
    <div className="relative w-full flex items-center justify-center">
      <div className="absolute inset-0 w-full flex items-center justify-center">
        <div className="w-[60%]">
          <TextAnimator
            classname="text-8xl text-[#ffffff] text-shadow font-semibold text-center flex items-center justify-center "
            text="Own a piece of the future."
            space={20}
          />
        </div>
      </div>
      <Image height={100} width={1600} alt="img" src={"/banner47.png"} />
    </div>
  );
};
