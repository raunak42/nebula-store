"use client";

import Image from "next/image";
import { useState } from "react";

export const SignOutButton: React.FC = () => {
  const [showSpinner, setShowSpinner] = useState<boolean>(false);
  return (
    <button
      onClick={() => setShowSpinner(true)}
      className="p-4 rounded-full border-2 border-black flex items-center justify-center w-[140px] h-[50px] "
    >
      {showSpinner ? (
        <Image
          alt=""
          width={32}
          height={32}
          src={"/spinner.svg"}
          className="animate-spin"
        />
      ) : (
        <h1>Sign out</h1>
      )}
    </button>
  );
};
