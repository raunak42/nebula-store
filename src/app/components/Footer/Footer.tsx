import Image from "next/image";
import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full h-[380px] bg-gray-200 mt-[40px] flex flex-col items-center justify-between p-[24px]">
      <div className="flex flex-col items-center justify-center gap-[16px]">
        <h1 className="text-4xl font-semibold">Subscribe to the Newsletter</h1>
        <h3>
          Never miss out on exclusive merchandise drops and limited collections
          ever again!
        </h3>
      </div>
      <div className="border border-b rounded-md px-[12px] w-[600px] h-[50px] flex items-center justify-between bg-white">
        <input
          className="outline-none  w-[90%]"
          placeholder="email@example.com"
        ></input>
        <button className=" w-[10%] flex items-center justify-center" >
          {" "}
          <Image alt="img" width={24} height={24} src={"/arrowRight.svg"} />
        </button>
      </div>
      <div className="flex items-center justify-center gap-[48px]">
        <Link href={"https://github.com/raunak42"}>
          {" "}
          <Image alt="img" width={28} height={28} src={"/github.svg"} />
        </Link>
        <Link href={"https://x.com/raunaktwt"}>
          {" "}
          <Image alt="img" width={28} height={28} src={"/x.svg"} />
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center gap-[8px]">
        <Image alt="img" width={220} height={220} src={"/logo.svg"} />
        <div className="flex items-center gap-[4px] text-sm">
          <h1> Created by </h1>
          <Link
            className="underline flex items-center gap-[4px]"
            href={"https://github.com/raunak42"}
          >
            <h1>raunak42</h1>
            <Image alt="img" width={16} height={16} src={"/github.svg"} />
          </Link>
        </div>
      </div>
    </footer>
  );
};
