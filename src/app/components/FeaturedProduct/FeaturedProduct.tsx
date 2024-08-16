"use client";
import { PrismaProductOutput } from "@/app/utils/types";
import Image from "next/image";
import { motion } from "framer-motion";
import { TextAnimator } from "@/app/animators/TextAnimator/TextAnimator";

interface FeatProps {
  item: PrismaProductOutput;
}

export const FeaturedProduct: React.FC<FeatProps> = ({ item }) => {
  return (
    <div className="flex flex-row items-start justify-center gap-[120px] w-full">
      <motion.div
        initial={{ opacity: 0, x: -400 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, amount: 0.1 }}
      >
        <Image
          className="rounded-md"
          alt="img"
          width={600}
          height={600}
          src={item?.imageLink!}
        />
      </motion.div>

      <div className="flex flex-col w-[30%] ">
        <TextAnimator fromDown={true} classname="text-4xl " text="Featured:" />
        <TextAnimator
          fromDown={true}
          classname="text-4xl font-semibold flex items-start justify-start text-start"
          text={item?.name!}
          space={8}
        />
        <ul className="mt-[32px]">
          {item?.specifications?.map((spec, index) => {
            return (
              <TextAnimator
                classname="text-lg"
                text={`• ${spec}`}
                key={index}
                space={6}
                fromDown={true}
              ></TextAnimator>
            );
          })}
        </ul>
        <button className=" w-[60%] mt-[64px] bg-black text-lg text-white p-[12px] rounded-lg">
          Explore product
        </button>
      </div>
    </div>
  );
};
