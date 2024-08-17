"use client";
import { PrismaProductOutput } from "@/app/utils/types";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSetRecoilState } from "recoil";
import { productDetailsState, showNotificationState } from "@/store";

interface ProductCardProps {
  product: PrismaProductOutput;
  index: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const setProductDetails = useSetRecoilState(productDetailsState);
  const setShowNotification = useSetRecoilState(showNotificationState);
  const handleClick = () => {};

  return (
    <motion.div
      onClick={handleClick}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.25, delay: 0.1 * index }}
        className="w-[270px]  h-[440px] gap-[16px]  flex flex-col items-center"
      >
        <Link
          href={`/product/${product.id}`}
          className="flex flex-col w-[270px] h-[320px] items-center group cursor-pointer justify-center   "
        >
          <div className="dark:bg-white overflow-hidden size-[96%] group-hover:size-full group-hover:shadow-2xl rounded-lg ease-in-out  transition-all duration-300 flex items-center justify-center">
            <Image
              className="w-[70%] rounded-lg"
              alt="img"
              width={100}
              height={100}
              src={product.imageLink!}
            />
          </div>
        </Link>
        <div className="flex h-[100px] w-full gap-[8px] mt-auto flex-col items-center dark:text-white  ">
          <h1 className="line-clamp-1">{product.name}</h1>
          <h1>₹ {product.price}.00</h1>
          <button
            onClick={() => {
              setProductDetails(product);
              setShowNotification(true);
            }}
            className="border-[0.5px] border-black hover:border-[1px] hover:shadow-lg rounded-sm w-[100px] h-[30px] flex items-center justify-center text-sm font-light"
          >
            Add to cart
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
