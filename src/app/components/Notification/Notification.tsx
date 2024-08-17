"use client";
import { productDetailsState, showNotificationState } from "@/store";
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
  const product = useRecoilValue(productDetailsState);
  const [showNotification, setShowNotification] = useRecoilState(
    showNotificationState
  );
  return (
    <div className={`w-full flex items-start justify-end `}>
      <div
        className={`z-30 w-[340px]  border bg-white rounded-sm shadow-2xl mt-[-300px] fixed top-[12px] right-[96px] flex flex-col items-center justify-start ${session?"gap-[32px] p-[24px] h-[360px]":"gap-[16px] py-[4px] px-[24px] h-[180px]"} transition-all duration-300 ease-in-out ${
          showNotification ? "opacity-100 translate-y-[380px] " : " opacity-0"
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
          <button onClick={() => setShowNotification(false)}>
            <Image alt="" width={24} height={24} src={"/cross.svg"} />
          </button>
        </div>

        {session ? (
          <>
            <div className=" h-[200px] w-full flex items-start justify-start gap-[24px]">
              <Image alt="" width={60} height={60} src={product?.imageLink!} />
              <div className="flex flex-col gap-[4px] w-[60%]">
                <h1 className="text-sm">{product?.name}</h1>
                <h1 className="text-sm">₹ {product?.price}.00</h1>
              </div>
            </div>

            <div className="  flex flex-col items-center justify-start gap-[12px]">
              <button className="w-[300px] h-[50px] bg-white border-[1.5px] border-black rounded-full">
                View cart
              </button>
              <button className="w-[300px] h-[50px] bg-black rounded-full text-white">
                Check out
              </button>
              <h1
                onClick={() => setShowNotification(false)}
                className="underline decoration-dashed cursor-pointer"
              >
                Continue shopping
              </h1>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-[12px]">
            <div className="flex flex-col">
              <h1 className="text-2xl">You need to log in first.</h1>
            </div>
            <Link
              href={"/login/google"}
              className="shadow-xl rounded-full flex items-center justify-center w-full  border-[1.5px] hover:border-[2px] border-black"
            >
              <Image className="" alt="google" height={42} width={42} src={"/google.svg"} />
              <h1>Continue with google</h1>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
