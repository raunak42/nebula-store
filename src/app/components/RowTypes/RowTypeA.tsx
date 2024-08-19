import { Session } from "lucia";
import { ProductCard } from "../ProductCard.tsx/ProductCard";
import { PrismaProductOutput } from "@/app/utils/types";

interface RowTypeAProps {
  session: Session | null;
  items: PrismaProductOutput[];
}

export const RowTypeA: React.FC<RowTypeAProps> = ({ items, session }) => {
  return (
    <div className=" w-full flex flex-row flex-wrap items-center justify-center gap-[16px] lg:gap-0 lg:justify-between sm:px-[24px] mt-[16px] ">
      {items.map((item, index) => {
        return (
          <ProductCard
            session={session}
            index={index}
            product={item}
            key={index}
          />
        );
      })}
    </div>
  );
};
