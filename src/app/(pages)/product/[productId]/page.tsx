import { BASE_URL } from "@/app/utils/constants";
import { ApiDataAttributes } from "@/app/utils/types";
import axios from "axios";
import Image from "next/image";
import { ProductDetails } from "../ProductDetails";
import { Recommendations } from "../Recommendations";
import { validateRequest } from "@/auth";

interface PageParams {
  params: {
    productId: number;
  };
}

export default async function Page({ params }: PageParams) {
  const id = params.productId;
  const res1 = await fetch(`${BASE_URL}/api/getProductById`, {
    method: "POST",
    cache: "no-store",
    body: JSON.stringify({ id }),
  });
  const data1: ApiDataAttributes = await res1.json();
  const product = data1.product;

  const res2 = await fetch(`${BASE_URL}/api/getRandomProducts`, {
    method: "GET",
    cache: "no-store",
  });
  const data2: ApiDataAttributes = await res2.json();
  const recommendations = data2.products;

  const { session, user } = await validateRequest();

  return (
    <div className="flex flex-col items-center justify-start">
      <div className="w-full mt-[80px] h-[100vh]  overflow-hidden  flex items-center justify-center">
        <div className="w-[60%] mt-[200px] h-full flex items-start justify-center ">
          <Image
            className="rounded-sm"
            width={400}
            height={300}
            alt=""
            src={product?.imageLink!}
          />
        </div>
        <div className="w-[40%] mt-[200px] h-full  flex flex-col items-start justify-start">
          <ProductDetails session={session} product={product!} />
        </div>
      </div>
      <Recommendations products={recommendations!} />
    </div>
  );
}
