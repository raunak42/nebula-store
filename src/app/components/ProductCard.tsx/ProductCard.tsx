"use client";
import { PrismaProductOutput } from "@/app/utils/types";
import Image from "next/image";
import { motion } from "framer-motion";

interface ProductCardProps {
  item: PrismaProductOutput;
  index: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ item, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.25, delay: 0.1 * index }}
      className="w-[270px]  h-[400px]  flex flex-col items-center group cursor-pointer "
    >
      <div className="flex flex-col w-[270px] h-[320px] items-center justify-center   ">
        <div className="dark:bg-white overflow-hidden size-[96%] group-hover:size-full group-hover:shadow-2xl rounded-lg ease-in-out  transition-all duration-300 flex items-center justify-center">
          <Image
            className="w-[70%] rounded-lg"
            alt="img"
            width={100}
            height={100}
            src={item.imageLink!}
          />
        </div>
      </div>
      <div className="flex h-[60px] mt-auto flex-col items-center dark:text-white  ">
        <h1 className="w-full text-start line-clamp-1">{item.name}</h1>
        <div className="flex items-center justify-start gap-[16px]  w-full mt-auto">
          <h1>₹{item.price}/-</h1>
          <Image alt="add" width={24} height={24} src={"/add.svg"} />
        </div>
      </div>
    </motion.div>
  );
};
