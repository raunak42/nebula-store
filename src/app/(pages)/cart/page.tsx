"use client";
import Loading from "@/app/loading";
import { BASE_URL } from "@/app/utils/constants";
import {
  ApiDataAttributes,
  PrismaProductOutput,
  PrismaUserOutput,
} from "@/app/utils/types";
import { userDetailsState } from "@/store";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { CartItemCard, getOccurence } from "./CartItemCard";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  const [grandTotal, setGrandTotal] = useState<number>(0);
  const [uniqueProducts, setUniqueProducts] = useState<
    PrismaProductOutput[] | null
  >();
  const [showGTSpinner, setShowGTSpinner] = useState<boolean>(false);
  const [getFreshData, setGetFreshData] = useState<boolean>(false);
  const [user, setUser] = useRecoilState(userDetailsState);
  const [isClient, setIsCLient] = useState(false);
  const [allProducts, setAllProducts] = useState<
    PrismaProductOutput[] | null
  >();

  //////////////////////////////////////
  useEffect(() => {
    setIsCLient(true);
    const fetchData = async () => {
      if (!isClient || !user) {
        return;
      }
      const res = await fetch(`${BASE_URL}/api/getAllProducts`, {
        method: "GET",
        cache: "no-store",
      });
      const data: ApiDataAttributes = await res.json();
      if (data.message === "Success") {
        const allProducts = data.products!;
        const uniqueProducts = getUniqueProducts(allProducts, user);
        const total = getTotal(allProducts, user);

        setUniqueProducts(uniqueProducts);
        setGrandTotal(total);
        setAllProducts(allProducts); //This is required by the getFreshUserDetails function.
      }
    };
    fetchData();
  }, [isClient, user, grandTotal]);
  //////////////////////////////////////

  /////////////////////////////////////////////////////////////////////
  const getFreshUserDetails = useCallback(async () => {
    if (!user || !allProducts) {
      return;
    }
    const res = await fetch(`${BASE_URL}/api/getUserDetails`, {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify({ userId: user.id }),
    });
    const data: ApiDataAttributes = await res.json();
    if (data.user) {
      const freshUniqueProducts = getUniqueProducts(allProducts, data.user);
      const freshTotal = getTotal(allProducts, data.user);
      setUniqueProducts(freshUniqueProducts);
      setGrandTotal(freshTotal);
      setGetFreshData(false);
      setShowGTSpinner(false);
    }
  }, [allProducts, user]);

  useEffect(() => {
    //This useEffect listens for changes in getFreshData;
    if (getFreshData) {
      setShowGTSpinner(true);
      getFreshUserDetails();
    }
  }, [getFreshData, getFreshUserDetails]);

  ///////////////////////////////////////////////////////////////////////////

  if (!uniqueProducts) {
    return <Loading />;
  }

  return (
    <div className="w-full h-full px-[32px] lg:px-[128px] py-[24px] lg:py-[64px] flex items-start justify-center mt-[80px]">
      <div className="w-full h-full  flex flex-col items-center justify-start gap-[24px] lg:gap-[48px]">
        <div className="w-full flex items-center justify-between">
          {uniqueProducts.length > 0 ? (
            <h1 className=" text-2xl sm:text-3xl lg:text-4xl">Your cart:</h1>
          ) : (
            <h1 className=" text-2xl sm:text-3xl lg:text-4xl">
              Your cart is empty
            </h1>
          )}
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
            <h1 className="hidden sm:block">Item total</h1>
          </div>
          <div className="w-full flex flex-row items-center justify-center">
            <div className="flex flex-col w-full h-full border-t border-b lg:p-[24px] items-center ">
              {uniqueProducts.map((item, index) => {
                return (
                  <CartItemCard
                    user={user!}
                    item={item}
                    setGetFreshData={setGetFreshData}
                    key={index}
                  />
                );
              })}
            </div>
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
                ₹ {grandTotal}.00
              </h1>
            )}
          </div>
          <button className="cursor-not-allowed lg:w-[300px] lg:h-[50px] w-[160px] h-[40px] bg-black rounded-full text-white text-xl">
            <h1 className="text-sm lg:text-lg">Check out</h1>
          </button>
        </div>
      </div>
    </div>
  );
}

const getUniqueProducts = (
  allProducts: PrismaProductOutput[],
  user: PrismaUserOutput
) => {
  const uniqueProductIds = getUniqueProductIds(user);
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

const getUniqueProductIds = (user: PrismaUserOutput) => {
  let uniqueProductIds: number[] = [];
  user.cart?.forEach((product) => {
    if (!uniqueProductIds.includes(product)) {
      uniqueProductIds.push(product);
    }
  });
  return uniqueProductIds;
};

const getTotal = (
  allProducts: PrismaProductOutput[],
  user: PrismaUserOutput
) => {
  let total = 0;
  const unique = getUniqueProducts(allProducts, user);
  unique.map((item) => {
    const occurence = getOccurence(user, item);
    total = total + occurence * item.price!;
  });
  return total;
};
