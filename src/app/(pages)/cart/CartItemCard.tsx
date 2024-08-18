"use client";
import {
  ApiDataAttributes,
  PrismaProductOutput,
  PrismaUserOutput,
} from "@/app/utils/types";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/app/utils/constants";
import { RemoveBodyParams } from "@/app/api/removeFromCart/route";
import { AddToCartParams } from "@/app/api/addToCart/route";
import { RemoveOneBodyParams } from "@/app/api/removeOneFromCart/route";
import { useRecoilState } from "recoil";
import { showGTSpinnerState } from "@/store";

interface CartItemCardProps {
  item: PrismaProductOutput;
  user: PrismaUserOutput;
}

export const CartItemCard: React.FC<CartItemCardProps> = ({ item, user }) => {
  const [qty, setQty] = useState<number>(0);
  const [itemTotal, setItemTotal] = useState<number>(0);
  const [hideCard, setHideCard] = useState<boolean>(false);
  const [showBinSpinner, setShowBinSpinner] = useState<boolean>(false);
  const [showTotalSpinner, setShowTotalSpinner] = useState<boolean>(false);
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const [userData, setUserData] = useState<PrismaUserOutput | null>(user);
  const [showGTSpinner, setShowGTSpinner] = useRecoilState(showGTSpinnerState);

  useEffect(() => {
    const totalUnique = getOccurence(userData!, item);
    const itemTotal = item?.price! * qty;
    setQty(totalUnique);
    setItemTotal(itemTotal);
  }, [item, user, qty, userData]);

  const handleDelete = async () => {
    setShowGTSpinner(true);
    setShowBinSpinner(true);
    const body: RemoveBodyParams = {
      productId: item.id!,
      userId: user.id!,
    };
    const res = await fetch(`${BASE_URL}/api/removeFromCart`, {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify(body),
    });
    const data: ApiDataAttributes = await res.json();
    console.log(data.message);
    if (data.message === "Success") {
      setHideCard(true);
    }
  };

  const addToCart = async () => {
    const body: AddToCartParams = {
      productId: item.id!,
      userId: user.id!,
      quantity: 1,
    };

    const res = await fetch(`${BASE_URL}/api/addToCart`, {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify(body),
    });
    const data: ApiDataAttributes = await res.json();
    if (data.message === "Success" && data.user) {
      setUserData(data.user);
      const totalUnique = getOccurence(userData!, item);
      setQty(totalUnique);
      setItemTotal(item.price! * qty);
      setShowTotalSpinner(false);
      setDisableButton(false);
    }
  };

  const subFromCart = async () => {
    const body: RemoveOneBodyParams = {
      productId: item.id!,
      userId: user.id!,
    };
    const response = await fetch(`${BASE_URL}/api/removeOneFromCart`, {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify(body),
    });
    const data: ApiDataAttributes = await response.json();
    if (data.message === "Success" && data.user) {
      setUserData(data.user);
      const totalUnique = getOccurence(userData!, item);
      setQty(totalUnique);
      setItemTotal(item.price! * qty);
      setShowTotalSpinner(false);
      setDisableButton(false);
    }
  };

  return (
    !hideCard && (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="flex items-center justify-between m-[32px]"
      >
        <div className="flex items-start justify-start gap-[48px]">
          <Image alt="" width={100} height={100} src={item.imageLink!} />
          <div className="flex flex-col items-start justify-start gap-[4px]">
            <h1 className="text-lg ">{item.name}</h1>
            <h1 className="text-sm">₹ {item.price}.00</h1>
            <h1 className="text-sm ">Theme: {item.theme}</h1>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between w-[30%]">
          <div className="flex items-center gap-[12px]">
            <div className="h-[40px] shadow w-[120px] bg-white text-black rounded-none border flex items-center justify-center gap-[18px]">
              <button
                className="disabled:cursor-not-allowed disabled:opacity-50"
                disabled={(disableButton || qty === 1) && true}
                onClick={() => {
                  setShowGTSpinner(true);
                  setShowTotalSpinner(true);
                  setDisableButton(true);
                  subFromCart();
                }}
              >
                <Image alt="" width={18} height={18} src={"/minus.svg"} />
              </button>
              <h1 className="w-[20%] flex items-center justify-center">
                {qty}
              </h1>
              <button
                className="disabled:cursor-not-allowed"
                disabled={disableButton && true}
                onClick={() => {
                  setShowGTSpinner(true);
                  setShowTotalSpinner(true);
                  setDisableButton(true);
                  addToCart();
                }}
              >
                <Image alt="" width={18} height={18} src={"/plus.svg"} />
              </button>
            </div>
            <button
              onClick={handleDelete}
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
          {!showTotalSpinner ? (
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
    )
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
