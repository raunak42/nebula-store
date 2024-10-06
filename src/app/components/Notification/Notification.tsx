"use client";
import {
  productDetailsState,
  productQtyState,
  showNotificationState,
} from "@/store";
import { Session, User } from "lucia";
import Image from "next/image";
import Link from "next/link";
import { useRecoilState, useRecoilValue } from "recoil";

interface NotificationProps {
  session: Session | null;
  user: User | null;
}

export const Notification: React.FC<NotificationProps> = ({
  session,
  user,
}) => {
  const [product, setProduct] = useRecoilState(productDetailsState);
  const [showNotification, setShowNotification] = useRecoilState(
    showNotificationState
  );
  const quantity = useRecoilValue(productQtyState);
  return (
    <div
      className={`w-full flex items-start md:justify-end justify-center px-[64px] relative`}
    >
      <div
        className={`z-30   border bg-white rounded-sm  mt-[-360px] fixed top-0 flex flex-col items-center justify-start ${
          session
            ? "gap-[32px] w-[340px] p-[24px] h-[360px]"
            : "gap-[8px] md:gap-[16px] w-[280px] h-[120px] md:w-[340px] py-[8px] px-[24px] md:h-[180px]"
        } transition-all duration-300 ease-in-out ${
          showNotification
            ? "opacity-100 translate-y-[460px] shadow-2xl "
            : "opacity-0"
        }  `}
      >
        <div
          className={`w-full flex items-center ${
            session ? "justify-between" : "justify-end"
          }`}
        >
          {session && (
            <div className="flex items-center gap-[6px]">
              <Image alt="" width={16} height={16} src={"/check.svg"} />
              <h1 className="text-xs">Item added to cart</h1>
            </div>
          )}
          <button
            className="hover:translate-y-[-4px] transition-all duration-200"
            onClick={() => {
              setShowNotification(false);
              setProduct(null);
            }}
          >
            <Image
              alt=""
              className="hidden md:block"
              width={24}
              height={24}
              src={"/cross.svg"}
            />
            <Image
              alt=""
              className="visible md:hidden"
              width={18}
              height={18}
              src={"/cross.svg"}
            />
          </button>
        </div>

        {session ? (
          <>
            <div className=" h-[200px] w-full flex items-start justify-start gap-[24px]">
              {product && (
                <Image
                  alt=""
                  width={60}
                  height={60}
                  src={product?.imageLink!}
                />
              )}
              <div className="flex flex-col gap-[4px] w-[50%]">
                <h1 className="text-sm">{product?.name}</h1>
                <h1 className="text-sm">₹ {product?.price}.00</h1>
              </div>
              <h1 className="text-md font-semibold ">x {quantity}</h1>
            </div>

            <div className="  flex flex-col items-center justify-start gap-[12px]">
              <Link
                onClick={() => setShowNotification(false)}
                href={"/cart"}
                className=" flex items-center justify-center w-[300px] h-[50px] bg-white border-[1.5px] border-black rounded-full hover:translate-y-[-4px] transition-all duration-200"
              >
                View cart
              </Link>
              <Link
                onClick={() => setShowNotification(false)}
                href={"/cart"}
                className=" flex items-center justify-center w-[300px] h-[50px] bg-black rounded-full text-white hover:translate-y-[-4px] transition-all duration-200"
              >
                Check out
              </Link>
              <h1
                onClick={() => setShowNotification(false)}
                className="underline decoration-dashed cursor-pointer"
              >
                Continue shopping
              </h1>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-[8px] md:gap-[12px]">
            <div className="flex flex-col">
              <h1 className="text-sm text-center md:text-2xl">
                You need to log in first.
              </h1>
            </div>
            <Link
              href={"/login/google"}
              className="shadow-xl rounded-full flex items-center justify-center w-[180px] h-[30px] md:h-fit md:w-full  border-[1.5px] hover:border-[2px] border-black"
            >
              <Image
                className="visible md:hidden"
                alt="google"
                height={28}
                width={28}
                src={"/google.svg"}
              />
              <Image
                className="hidden md:block"
                alt="google"
                height={42}
                width={42}
                src={"/google.svg"}
              />
              <h1 className="md:text-base text-xs">Continue with google</h1>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
