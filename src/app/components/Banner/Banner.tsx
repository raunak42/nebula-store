"use client";
import { TextAnimator } from "@/app/animators/TextAnimator/TextAnimator";
import Image from "next/image";
import { motion } from "framer-motion";
import banner47 from "@/../public/banner47.png";

export const Banner: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-full flex items-center justify-center"
    >
      <div className="absolute inset-0 w-full flex items-center justify-center">
        <div className="w-[60%]">
          <TextAnimator
            classname="text-3xl sm:text-6xl lg:text-8xl text-[#ffffff] text-shadow font-semibold text-center flex items-center justify-center "
            text="Own a piece of the future."
            space={20}
          />
        </div>
      </div>
      <div className="w-full">
        <Image alt="img" src={banner47} />
      </div>
    </motion.div>
  );
};
