"use client";
import { ReactNode } from "react";
import { RecoilRoot } from "recoil";

interface RecoilWrapperProps {
  children: ReactNode;
}

export const RecoilWrapper: React.FC<RecoilWrapperProps> = ({ children }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};
