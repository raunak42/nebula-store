import { ProductCard } from "@/app/components/ProductCard.tsx/ProductCard";
import { PrismaProductOutput } from "@/app/utils/types";
import { validateRequest } from "@/auth";

interface RecommendationsProps {
  products: PrismaProductOutput[];
}
export const Recommendations: React.FC<RecommendationsProps> = async({
  products,
}) => {
  const {session, user} = await validateRequest()
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h1 className="text-4xl text-center w-full p-[24px]">
        You may also like:
      </h1>
      <div className=" w-full flex flex-row flex-wrap items-center justify-center gap-[16px] lg:gap-0 lg:justify-between sm:px-[24px] mt-[16px] ">
        {products.map((item, index) => {
          return <ProductCard session={session} index={index} product={item} key={index} />;
        })}
      </div>
    </div>
  );
};
