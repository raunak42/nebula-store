import { Session } from "lucia";
import { ProductCard } from "../ProductCard.tsx/ProductCard";
import { PrismaProductOutput } from "@/app/utils/types";

interface RowTypeBProps {
  session: Session | null;
  items: PrismaProductOutput[];
}

export const RowTypeB: React.FC<RowTypeBProps> = ({ items, session }) => {
  return (
    <div className=" w-full flex flex-row flex-wrap items-center justify-center gap-[16px] lg:gap-[12px] mt-[16px] px-[12px] ">
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
