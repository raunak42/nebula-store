"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface AuthCardProps {}

const AuthCard: React.FC<AuthCardProps> = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  return (
    <div className="w-[400px] h-[460px] border-2 border-black flex flex-col gap-[8px] p-[8px]">
      <input
        name="email"
        className="outline-none border p-[4px]"
        placeholder="email"
      ></input>
      <input
        name="password"
        className="outline-none border p-[4px]"
        type="password"
        placeholder="password"
      ></input>
      <button className="p-[4px] border rounded-full">Continue</button>
      <button
        onClick={() => {
          router.push("/login/google");
        }}
        className="p-[4px] rounded-full flex items-center justify-center gap-4 border border-black"
      >
        <Image alt="google" height={40} width={40} src={"/google.svg"} />
        <h1>Continue with google</h1>
      </button>
    </div>
  );
};

export default AuthCard;
