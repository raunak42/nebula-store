"use client";
import { AddToCartParams } from "@/app/api/addToCart/route";
import { BASE_URL } from "@/app/utils/constants";
import { ApiDataAttributes, PrismaProductOutput } from "@/app/utils/types";
import {
  productDetailsState,
  productQtyState,
  showNotificationState,
} from "@/store";
import { Session } from "lucia";
import Image from "next/image";
import { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

interface ProductDetailsProps {
  product: PrismaProductOutput;
  session: Session | null;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  session,
}) => {
  const setProductDetails = useSetRecoilState(productDetailsState);
  const [quantity, setQuantity] = useRecoilState<number>(productQtyState);
  const setShowNotification = useSetRecoilState(showNotificationState);
  const [showSpinner, setShowSpinner] = useState<boolean>(false);

  const addToCart = async () => {
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
    }
  };

  return (
    <div className="w-[70%] flex flex-col gap-[12px]">
      <div className="flex flex-col gap-[12px]">
        <h1 className="text-4xl font-semibold">{product?.name}:</h1>
        <ul>
          {product?.specifications?.map((spec, index) => {
            return <h1 key={index}>• {spec}</h1>;
          })}
        </ul>
        <h1 className="font-semibold text-2xl">₹ {product?.price}.00</h1>
      </div>

      <div className="flex flex-col gap-[24px] mt-[32px]">
        <div className="h-[40px] w-[120px] bg-white text-black rounded-none border flex items-center justify-center gap-[18px]">
          <button
            className={`${quantity === 1 && "cursor-not-allowed"}`}
            onClick={() => {
              if (quantity !== 1) setQuantity((prev) => prev - 1);
            }}
          >
            <Image alt="" width={18} height={18} src={"/minus.svg"} />
          </button>
          <h1 className="w-[20%] flex items-center justify-center">
            {quantity}
          </h1>
          <button
            onClick={() => {
              setQuantity((prev) => prev + 1);
            }}
          >
            <Image alt="" width={18} height={18} src={"/plus.svg"} />
          </button>
        </div>
        <button
          onClick={() => {
            setShowSpinner(true);
            addToCart();
            setProductDetails(product);
          }}
          className="h-[40px] w-[300px] bg-black flex items-center justify-center rounded-sm"
        >
          {showSpinner ? (
            <Image
              alt=""
              width={24}
              height={24}
              src={"/spinner-white.svg"}
              className="animate-spin"
            />
          ) : (
            <h1 className="text-white"> Add to cart</h1>
          )}
        </button>
        <p>{product?.description}</p>
      </div>
    </div>
  );
};
