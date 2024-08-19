import { RemoveBodyParams } from "@/app/api/removeFromCart/route";
import { BASE_URL } from "@/app/utils/constants";
import {
  ApiDataAttributes,
  PrismaProductOutput,
  PrismaUserOutput,
} from "@/app/utils/types";
import { Dispatch, SetStateAction } from "react";
import { getOccurence } from "./CartItemCard";
import { SetterOrUpdater } from "recoil";
import { RemoveOneBodyParams } from "@/app/api/removeOneFromCart/route";
import { AddToCartParams } from "@/app/api/addToCart/route";

interface CartFunctionsParams {
  setShowBinSpinner: Dispatch<SetStateAction<boolean>>;
  item: PrismaProductOutput;
  user: PrismaUserOutput;
  setQty: Dispatch<SetStateAction<number>>;
  setItemTotal: Dispatch<SetStateAction<number>>;
  setShowItemTotalSpinner: Dispatch<SetStateAction<boolean>>;
  setGetFreshData: Dispatch<SetStateAction<boolean>>;
  setGetFreshCartBadge: SetterOrUpdater<boolean>;
}

interface FlowParams extends CartFunctionsParams {
  freshUserData: PrismaUserOutput | null;
}

export const handleDelete = async ({
  setShowBinSpinner,
  item,
  user,
  setQty,
  setItemTotal,
  setShowItemTotalSpinner,
  setGetFreshCartBadge,
  setGetFreshData,
}: CartFunctionsParams) => {
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
    refreshFlow({
      item,
      setQty,
      setItemTotal,
      setShowBinSpinner,
      setShowItemTotalSpinner,
      user,
      setGetFreshCartBadge,
      setGetFreshData,
      freshUserData: null,
    });
  }
};

export const handlePlus = async ({
  setShowBinSpinner,
  item,
  user,
  setQty,
  setItemTotal,
  setShowItemTotalSpinner,
  setGetFreshCartBadge,
  setGetFreshData,
}: CartFunctionsParams) => {
  setShowItemTotalSpinner(true);
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
    refreshFlow({
      item,
      setGetFreshCartBadge,
      setGetFreshData,
      setItemTotal,
      setQty,
      setShowBinSpinner,
      setShowItemTotalSpinner,
      user,
      freshUserData: data.user,
    });
  }
};

export const handleMinus = async ({
  setShowBinSpinner,
  item,
  user,
  setQty,
  setItemTotal,
  setShowItemTotalSpinner,
  setGetFreshCartBadge,
  setGetFreshData,
}: CartFunctionsParams) => {
  setShowItemTotalSpinner(true);
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
    const qty = getOccurence(data.user, item);
    refreshFlow({
      item,
      setGetFreshCartBadge,
      setGetFreshData,
      setItemTotal,
      setQty,
      setShowBinSpinner,
      setShowItemTotalSpinner,
      user,
      freshUserData: data.user,
    });
  }
};

export const refreshFlow = ({
  freshUserData,
  item,
  setQty,
  setItemTotal,
  setShowBinSpinner,
  setShowItemTotalSpinner,
  setGetFreshCartBadge,
  user,
  setGetFreshData,
}: FlowParams) => {
  let qty = 0;
  if (freshUserData) {
    qty = getOccurence(freshUserData, item);
    setQty(qty);
    setItemTotal(item.price! * qty);
    setShowItemTotalSpinner(false);
  } else {
    setShowBinSpinner(false);
  }
  setGetFreshData(true);
  setGetFreshCartBadge(true);
};
