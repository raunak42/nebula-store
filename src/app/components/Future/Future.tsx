import { PrismaProductOutput } from "@/app/utils/types";
import { ProductCard } from "../ProductCard.tsx/ProductCard";

interface FutureProps {
  items: PrismaProductOutput[];
}

export const Future: React.FC<FutureProps> = ({ items }) => {
  return (
    <div id="future" className="flex flex-col items-center">
      <div className="w-full flex flex-col items-center justify-center gap-[8px]">
        <h1 className="text-5xl">The Human Future:</h1>
        <h3 className="text-2xl">Time Travellers Collection</h3>
      </div>
      <div className=" w-full flex flex-row flex-wrap items-center justify-center gap-[12px] mt-[16px] px-[12px] ">
        {items.map((item, index) => {
          return <ProductCard index={index} item={item} key={index} />;
        })}
      </div>
    </div>
  );
};
