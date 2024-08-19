"use client";
import { PrismaProductOutput, PrismaUserOutput } from "@/app/utils/types";
import Image from "next/image";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { getFreshCartBadgeState } from "@/store";
import Link from "next/link";
import { handleDelete, handleMinus, handlePlus } from "./helpers";

interface CartItemCardProps {
  item: PrismaProductOutput;
  user: PrismaUserOutput;
  setGetFreshData: Dispatch<SetStateAction<boolean>>;
}

export const CartItemCard: React.FC<CartItemCardProps> = ({
  item,
  user,
  setGetFreshData,
}) => {
  const [qty, setQty] = useState<number>(0);
  const [itemTotal, setItemTotal] = useState<number>(0);
  const [showBinSpinner, setShowBinSpinner] = useState<boolean>(false);
  const [showItemTotalSpinner, setShowItemTotalSpinner] =
    useState<boolean>(false);
  const [getFreshCartBadge, setGetFreshCartBadge] = useRecoilState(
    getFreshCartBadgeState
  );

  ///////////////////////////////////////////////////////////////
  useEffect(() => {
    if (!item || !user) {
      return;
    }
    const qty = getOccurence(user, item);
    const itemTotal = item.price! * qty;
    setQty(qty);
    setItemTotal(itemTotal);
  }, [item, user]);
  ///////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////
  const refreshProps = {
    item,
    setGetFreshCartBadge,
    setGetFreshData,
    setItemTotal,
    setQty,
    setShowBinSpinner,
    setShowItemTotalSpinner,
    user,
  };
  ///////////////////////////////////////////////////////////////

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="flex  flex-col gap-[24px] items-start lg:flex-row w-full lg:items-center justify-between m-[32px]"
    >
      <Link
        href={`product/${item.id}`}
        className="cursor-pointer flex items-start justify-start gap-[48px] "
      >
        <Image alt="" width={100} height={100} src={item.imageLink!} />
        <div className="flex flex-col items-start justify-start gap-[4px] group">
          <h1 className="text-lg group-hover:underline ">{item.name}</h1>
          <h1 className="text-sm">₹ {item.price}.00</h1>
          <h1 className="text-sm ">Theme: {item.theme}</h1>
        </div>
      </Link>

      <div className="flex flex-row items-center justify-between  w-full lg:w-[40%]">
        <div className="flex items-center gap-[12px]">
          <div className="h-[40px] shadow w-[120px] bg-white text-black rounded-none border flex items-center justify-center gap-[18px]">
            <button
              className="disabled:cursor-not-allowed disabled:opacity-50"
              disabled={(showItemTotalSpinner || qty === 1) && true}
              onClick={() => {
                handleMinus(refreshProps);
              }}
            >
              <Image alt="" width={18} height={18} src={"/minus.svg"} />
            </button>
            <h1 className="w-[20%] flex items-center justify-center">{qty}</h1>
            <button
              className="disabled:cursor-not-allowed"
              disabled={showItemTotalSpinner && true}
              onClick={() => {
                handlePlus(refreshProps);
              }}
            >
              <Image alt="" width={18} height={18} src={"/plus.svg"} />
            </button>
          </div>
          <button
            onClick={() => {
              handleDelete({
                item,
                setQty,
                setShowBinSpinner,
                user,
                setGetFreshCartBadge,
                setGetFreshData,
                setItemTotal,
                setShowItemTotalSpinner,
              });
            }}
            className="flex items-center justify-center"
          >
            {showBinSpinner ? (
              <Image
                alt=""
                className="animate-spin"
                width={18}
                height={18}
                src={"/spinner.svg"}
              />
            ) : (
              <Image alt="" width={18} height={18} src={"/bin.svg"} />
            )}
          </button>
        </div>
        {!showItemTotalSpinner ? (
          <h1 className="text-xl">₹ {itemTotal}.00</h1>
        ) : (
          <Image
            alt=""
            className="animate-spin"
            width={32}
            height={32}
            src={"/spinner.svg"}
          />
        )}
      </div>
    </motion.div>
  );
};

export const getOccurence = (
  user: PrismaUserOutput,
  item: PrismaProductOutput
) => {
  let occurence = 0;
  const cart = user.cart;
  cart?.forEach((id) => {
    if (id === item.id) {
      occurence++;
    }
  });
  return occurence;
};
