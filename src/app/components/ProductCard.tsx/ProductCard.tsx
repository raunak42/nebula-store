"use client";
import { ApiDataAttributes, PrismaProductOutput } from "@/app/utils/types";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  calculateCartItemsState,
  productDetailsState,
  productQtyState,
  showNotificationState,
} from "@/store";
import { BASE_URL } from "@/app/utils/constants";
import { Session } from "lucia";
import { AddToCartParams } from "@/app/api/addToCart/route";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

interface ProductCardProps {
  product: PrismaProductOutput;
  index: number;
  session: Session | null;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  index,
  session,
}) => {
  const setProductDetails = useSetRecoilState(productDetailsState);
  const setShowNotification = useSetRecoilState(showNotificationState);
  const [showSpinner, setShowSpinner] = useState<boolean>(false);
  const [quantity, setQuantity] = useRecoilState<number>(productQtyState);
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const [calculateCartItems, setCalculateCartItems] = useRecoilState(
    calculateCartItemsState
  );

  const xl = useMediaQuery({ minWidth: 1284 }); //xl breakpoint
  const lg = useMediaQuery({ minWidth: 1024 }); //lg breakpoint
  const md = useMediaQuery({ minWidth: 768 }); //md breakpoint
  const sm = useMediaQuery({ minWidth: 640 }); //sm breakpoint

  const addToCart = async () => {
    setQuantity(1);
    const body: AddToCartParams = {
      productId: product.id!,
      userId: session?.userId!,
      quantity: quantity,
    };

    const res = await fetch(`${BASE_URL}/api/addToCart`, {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify(body),
    });
    const data: ApiDataAttributes = await res.json();
    if (data.message === "Success") {
      setShowNotification(true);
      setShowSpinner(false);
      setDisableButton(false);
      setCalculateCartItems(true)
    }
  };

  return (
    <motion.div
      initial={sm && { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={sm && { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.25, delay: 0.1 * index }}
        className="mt-[16px] sm:w-[270px]  sm:h-[440px] sm:gap-[16px] w-[162px] h-[264px] gap-[6px] flex flex-col items-center"
      >
        <Link
          href={`/product/${product.id}`}
          className="flex flex-col sm:w-[270px] sm:h-[320px] w-[162px] h-[192px] items-center group cursor-pointer justify-center   "
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
            disabled={disableButton && true}
            onClick={() => {
              if (session) {
                setShowSpinner(true);
                setProductDetails(product);
                setDisableButton(true);
                addToCart();
              } else {
                setShowNotification(true);
              }
            }}
            className="border-[1px]  disabled:cursor-not-allowed border-black hover:border-[1.5px] hover:shadow-lg rounded-sm w-[100px] h-[30px] flex items-center justify-center "
          >
            {showSpinner ? (
              <Image
                alt=""
                width={16}
                height={16}
                src={"/spinner.svg"}
                className="animate-spin"
              />
            ) : (
              <h1 className="text-sm ">Add to cart</h1>
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
