"use client";
import { TextAnimator } from "@/app/animators/TextAnimator/TextAnimator";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import NextTopLoader from "nextjs-toploader";

export const Footer: React.FC = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full sm:h-[380px] bg-gray-200 mt-[40px] flex flex-col items-center gap-[24px] sm:justify-between p-[24px]"
    >
      <NextTopLoader color="#000000" showSpinner={false} height={4} />

      <div className="flex flex-col  items-center justify-center gap-[8px] sm:gap-[16px]">
        <TextAnimator
          classname="text-2xl sm:text-4xl  font-semibold flex items-center justify-center"
          text="Subscribe to the Newsletter!"
          space={10}
        />
        <TextAnimator
          classname="hidden sm:flex items-center justify-center text-xs sm:text-base"
          text="Never miss out on exclusive merchandise drops and limited collections
          ever again!"
          space={5}
        />
      </div>
      <div className="border border-b rounded-md px-[12px] w-[300px] sm:w-[600px] h-[50px] flex items-center justify-between bg-white">
        <input
          className="outline-none   w-[90%]"
          placeholder="email@example.com"
        ></input>
        <button className=" w-[10%] flex items-center justify-center">
          {" "}
          <Image alt="img" width={24} height={24} src={"/arrowRight.svg"} />
        </button>
      </div>
      <div className="flex items-center justify-center gap-[48px]">
        <Link href={"https://github.com/raunak42"}>
          {" "}
          <Image alt="img" width={28} height={28} src={"/github.svg"} />
        </Link>
        <Link href={"https://x.com/raunaktwt"}>
          {" "}
          <Image alt="img" width={28} height={28} src={"/x.svg"} />
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center gap-[8px]">
        <Image alt="img" width={220} height={220} src={"/logo.svg"} />
        <div className="flex items-center gap-[4px] text-sm">
          <h1> Created by </h1>
          <Link
            className="underline flex items-center gap-[4px]"
            href={"https://github.com/raunak42"}
          >
            <h1>raunak42</h1>
            <Image alt="img" width={16} height={16} src={"/github.svg"} />
          </Link>
        </div>
      </div>
    </motion.footer>
  );
};
