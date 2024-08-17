import { ProductCard } from "@/app/components/ProductCard.tsx/ProductCard";
import { PrismaProductOutput } from "@/app/utils/types";

interface RecommendationsProps {
  products: PrismaProductOutput[];
}
export const Recommendations: React.FC<RecommendationsProps> = ({
  products,
}) => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h1 className="text-4xl text-center w-full p-[24px]">
        You may also like:
      </h1>
      <div className=" w-full flex flex-row flex-wrap items-center justify-center gap-[60px] px-[24px] mt-[16px] ">
        {products.map((item, index) => {
          return <ProductCard index={index} product={item} key={index} />;
        })}
      </div>
    </div>
  );
};
