import { PrismaProductOutput } from "@/app/utils/types";
import { ProductCard } from "../ProductCard.tsx/ProductCard";

interface HighlightsProps {
  items: PrismaProductOutput[];
}

export const Highlights: React.FC<HighlightsProps> = ({ items }) => {
  return (
    <div id="more">
      <div className="w-full flex flex-col items-center justify-center gap-[8px]">
        <h1 className="text-3xl underline decoration-dotted ">
          Explore more products:
        </h1>
      </div>
      <div className=" w-full flex flex-row flex-wrap items-center justify-between px-[24px] mt-[16px] ">
        {items.map((item, index) => {
          return <ProductCard index={index} item={item} key={index} />;
        })}
      </div>
    </div>
  );
};
