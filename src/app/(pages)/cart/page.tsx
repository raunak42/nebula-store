"use client";
import Loading from "@/app/loading";
import { BASE_URL } from "@/app/utils/constants";
import {
  ApiDataAttributes,
  PrismaProductOutput,
  PrismaUserOutput,
} from "@/app/utils/types";
import { showGTSpinnerState, userDetailsState } from "@/store";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { CartItemCard, getOccurence } from "./CartItemCard";
import Image from "next/image";

export default function Page() {
  const [grandTotal, setGrandTotal] = useState<number>(0);
  const [showGTSpinner, setShowGTSpinner] = useRecoilState(showGTSpinnerState);
  const [user, setUser] = useRecoilState(userDetailsState);
  const [isClient, setIsCLient] = useState(false);
  const [allProducts, setAllProducts] = useState<
    PrismaProductOutput[] | null
  >();

  useEffect(() => {
    setIsCLient(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${BASE_URL}/api/getAllProducts`, {
        method: "GET",
        cache: "no-store",
      });
      const data: ApiDataAttributes = await res.json();
      const products = data.products!;
      setAllProducts(products);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!isClient || !user || !allProducts) {
      return;
    }

    const uniqueProductIds = getUniqueProductIds(user);
    const uniqueProducts = getUniqueProducts(allProducts, uniqueProductIds);
    const total = getTotal(allProducts, uniqueProductIds, user);
    setGrandTotal(total);
  }, [allProducts, isClient, user]);

  useEffect(() => {
    if (!isClient || !user || !allProducts) {
      return;
    }

    const handleClick = async () => {
      const res = await fetch(`${BASE_URL}/api/getUserDetails`, {
        method: "POST",
        cache: "no-store",
        body: JSON.stringify({ userId: user.id }),
      });
      const data: ApiDataAttributes = await res.json();
      if (data.user) {
        const uniqueProductIds = getUniqueProductIds(data.user);
        const uniqueProducts = getUniqueProducts(allProducts, uniqueProductIds);
        const total = getTotal(allProducts, uniqueProductIds, data.user);
        setGrandTotal(total);
        setShowGTSpinner(false);
      }
    };
    if (showGTSpinner) {
      handleClick();
    }
  }, [allProducts, isClient, showGTSpinner, user, setShowGTSpinner]);

  if (!isClient || !user || !allProducts) {
    return <Loading />;
  }

  const uniqueProductIds = getUniqueProductIds(user);
  const uniqueProducts = getUniqueProducts(allProducts, uniqueProductIds);

  return (
    <div className="w-full h-full px-[128px] py-[64px] flex items-start justify-center mt-[80px]">
      <div className="w-full h-full  flex flex-col items-center justify-start gap-[48px]">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-4xl">Your cart:</h1>
          <h3 className="underline">Continue shopping</h3>
        </div>

        <div className="w-full flex flex-row items-center justify-center">
          <div className="flex flex-col w-full h-full border-t border-b p-[24px]">
            {uniqueProducts.map((item, index) => {
              return <CartItemCard user={user} item={item} key={index} />;
            })}
          </div>
        </div>
        <div className="w-full flex flex-col items-end justify-start gap-[32px]  mx-[48px]">
          <div className="flex items-start w-[400px] justify-between  ">
            <h1 className="text-2xl">Estimated total:</h1>
            {showGTSpinner ? (
              <div className="w-[60px] flex items-start justify-center">
                <Image
                  alt=""
                  className="animate-spin"
                  width={36}
                  height={36}
                  src={"/spinner.svg"}
                />
              </div>
            ) : (
              <h1 className="text-2xl font-semibold"> ₹ {grandTotal}.00</h1>
            )}
          </div>
          <button className="w-[300px] h-[50px] bg-black rounded-full text-white text-xl" >Checkout</button>
        </div>
      </div>
    </div>
  );
}

const getUniqueProductIds = (user: PrismaUserOutput) => {
  let uniqueProductIds: number[] = [];
  user.cart?.forEach((product) => {
    if (!uniqueProductIds.includes(product)) {
      uniqueProductIds.push(product);
    }
  });
  return uniqueProductIds;
};

const getUniqueProducts = (
  allProducts: PrismaProductOutput[],
  uniqueProductIds: number[]
) => {
  let uniqueProducts: PrismaProductOutput[] = [];
  allProducts.map((product, index) => {
    uniqueProductIds.map((uniqueId) => {
      if (uniqueId === product.id) {
        uniqueProducts.push(product);
      }
    });
  });
  return uniqueProducts;
};

const getTotal = (
  allProducts: PrismaProductOutput[],
  uniqueProductIds: number[],
  user: PrismaUserOutput
) => {
  let total = 0;
  const unique = getUniqueProducts(allProducts, uniqueProductIds);
  unique.map((item) => {
    const occurence = getOccurence(user, item);
    total = total + occurence * item.price!;
  });
  return total;
};
