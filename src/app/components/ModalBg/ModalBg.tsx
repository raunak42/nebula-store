"use client";

import { showSideBarState } from "@/store";
import { useRecoilValue } from "recoil";

export const ModalBG: React.FC = () => {
  const showModal = useRecoilValue(showSideBarState);
  return (
    showModal && (
      <div className="z-40 w-full h-full fixed bg-black opacity-20 "></div>
    )
  );
};
