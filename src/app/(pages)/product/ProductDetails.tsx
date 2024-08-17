"use client";
import { PrismaProductOutput } from "@/app/utils/types";
import { showNotificationState } from "@/store";
import Image from "next/image";
import { useState } from "react";
import { useSetRecoilState } from "recoil";

interface ProductDetailsProps {
  product: PrismaProductOutput;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [counter, setCounter] = useState<number>(1);
  const setShowNotification = useSetRecoilState(showNotificationState);

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
            className={`${counter === 1 && "cursor-not-allowed"}`}
            onClick={() => {
              if (counter !== 1) setCounter((prev) => prev - 1);
            }}
          >
            <Image alt="" width={18} height={18} src={"/minus.svg"} />
          </button>
          <h1 className="w-[20%] flex items-center justify-center" >{counter}</h1>
          <button
            onClick={() => {
              setCounter((prev) => prev + 1);
            }}
          >
            <Image alt="" width={18} height={18} src={"/plus.svg"} />
          </button>
        </div>
        <button onClick={()=>setShowNotification(true)} className="h-[40px] w-[300px] bg-black text-white rounded-sm">
          Add to cart
        </button>
        <p>{product?.description}</p>
      </div>
    </div>
  );
};
