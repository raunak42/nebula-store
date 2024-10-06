"use client";
import { BodyType } from "@/app/api/checkoutSession/route";
import { BASE_URL } from "@/app/utils/constants";
import { PrismaProductOutput, PrismaUserOutput } from "@/app/utils/types";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface CheckoutButtonParams {
  products: PrismaProductOutput[];
  userDetails: PrismaUserOutput;
}

export const CheckoutButton: React.FC<CheckoutButtonParams> = ({
  products,
  userDetails,
}) => {
  const [showSpinner, setShowSpinner] = useState<boolean>(false);
  const router = useRouter();

  const body: BodyType = {
    products,
    userDetails,
  };

  const handleCheckout = async () => {
    setShowSpinner(true);
    const response = await fetch(`${BASE_URL}/api/checkoutSession`, {
      method: "POST",
      body: JSON.stringify(body),
      cache: "no-store",
    });

    if (response.ok) {
      const redirectUrl = await response.json();
      router.push(redirectUrl);
    }
  };

  return (
    <button
      disabled={showSpinner && true}
      onClick={handleCheckout}
      className={`${
        showSpinner ? "bg-black/60" : ""
      } flex items-center justify-center lg:w-[300px] lg:h-[50px] w-[160px] h-[40px] bg-black rounded-full text-white text-xl`}
    >
      {!showSpinner ? (
        <h1 className="text-sm lg:text-lg">Check out</h1>
      ) : (
        <LoaderCircle className="animate-spin" strokeWidth={1} />
      )}
    </button>
  );
};
