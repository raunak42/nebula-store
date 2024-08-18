"use client";
import { PrismaProductOutput } from "@/app/utils/types";
import Image from "next/image";
import { motion } from "framer-motion";
import { TextAnimator } from "@/app/animators/TextAnimator/TextAnimator";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";

interface FeatProps {
  item: PrismaProductOutput;
}

export const FeaturedProduct: React.FC<FeatProps> = ({ item }) => {
  // const xl = useMediaQuery({ minWidth: 1284 }); //xl breakpoint
  // const lg = useMediaQuery({ minWidth: 1024 }); //lg breakpoint
  // const md = useMediaQuery({ minWidth: 768 }); //md breakpoint
  const sm = useMediaQuery({ minWidth: 640 }); //sm breakpoint
  const [isLg, setIsLg] = useState<boolean>(false);

  useEffect(() => {
    if (window) {
      if (window.innerWidth > 1024) {
        setIsLg(true);
      }
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ amount: 0.1 }}
      className="flex sm:flex-row flex-col items-center sm:items-start sm:justify-center gap-[48px] sm:gap-[120px] w-full"
    >
      <motion.div
        initial={{ opacity: 0, x: sm ? -400 : -300 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, amount: 0.1 }}
      >
        {isLg ? (
          <Image
            className="rounded-md"
            alt="img"
            width={600}
            height={600}
            src={item?.imageLink!}
          />
        ) : (
          <Image
            className="rounded-md"
            alt="img"
            width={300}
            height={300}
            src={item?.imageLink!}
          />
        )}
      </motion.div>

      <div className="flex flex-col  w-[70%] sm:w-[30%] ">
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
        <Link
          href={`/product/${item.id}`}
          className=" w-full sm:w-[60%] mt-[64px] bg-black text-lg text-white p-[12px] rounded-lg flex items-center justify-center"
        >
          Explore product
        </Link>
      </div>
    </motion.div>
  );
};
