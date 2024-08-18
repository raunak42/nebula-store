"use client";
import Loading from "@/app/loading";
import { BASE_URL } from "@/app/utils/constants";
import {
  ApiDataAttributes,
  PrismaProductOutput,
  PrismaUserOutput,
} from "@/app/utils/types";
import {
  recalculateGTState,
  showGTSpinnerState,
  userDetailsState,
} from "@/store";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { CartItemCard, getOccurence } from "./CartItemCard";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  const [grandTotal, setGrandTotal] = useState<number>(0);
  const [showGTSpinner, setShowGTSpinner] = useRecoilState(showGTSpinnerState);
  const [recalculateGT, setRecalculateGT] = useRecoilState(recalculateGTState);
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

    const getUserDetails = async () => {
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
    if (recalculateGT) {
      getUserDetails();
      setRecalculateGT(false);
    }
  }, [
    allProducts,
    isClient,
    recalculateGT,
    user,
    setShowGTSpinner,
    setRecalculateGT,
  ]);

  if (!isClient || !user || !allProducts) {
    return <Loading />;
  }

  const uniqueProductIds = getUniqueProductIds(user);
  const uniqueProducts = getUniqueProducts(allProducts, uniqueProductIds);

  return (
    <div className="w-full h-full px-[32px] lg:px-[128px] py-[24px] lg:py-[64px] flex items-start justify-center mt-[80px]">
      <div className="w-full h-full  flex flex-col items-center justify-start gap-[24px] lg:gap-[48px]">
        <div className="w-full flex items-center justify-between">
          <h1 className=" text-2xl sm:text-3xl lg:text-4xl">Your cart:</h1>
          <Link
            href={"/"}
            className="underline text-sm md:text-base decoration-[1px] hover:decoration-[2px]"
          >
            Continue shopping
          </Link>
        </div>

        <div className="flex flex-col w-full">
          <div className="w-full flex items-center justify-between px-[24px] font-light text-sm">
            <h1>Item</h1>
            <h1>Item total</h1>
          </div>
          <div className="w-full flex flex-row items-center justify-center">
            <div className="flex flex-col w-full h-full border-t border-b lg:p-[24px] items-center ">
              {uniqueProducts.map((item, index) => {
                return <CartItemCard user={user} item={item} key={index} />;
              })}
            </div>
          </div>
        </div>

        <div className="w-full flex flex-row items-center justify-center">
          <div className="flex flex-col w-full h-full border-t border-b lg:p-[24px] items-center ">
            {uniqueProducts.map((item, index) => {
              return <CartItemCard user={user} item={item} key={index} />;
            })}
          </div>
        </div>
        <div className="w-full flex flex-col items-start lg:items-end justify-start gap-[32px]  mx-[48px] ">
          <div className="flex items-start w-full lg:w-[400px] justify-between  ">
            <h1 className="text-base lg:text-2xl">Estimated total:</h1>
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
              <h1 className="text-base lg:text-2xl font-semibold">
                {" "}
                ₹ {grandTotal}.00
              </h1>
            )}
          </div>
          <button className="lg:w-[300px] lg:h-[50px] w-[160px] h-[40px] bg-black rounded-full text-white text-xl">
            <h1 className="text-sm lg:text-lg">Check out</h1>
          </button>
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
