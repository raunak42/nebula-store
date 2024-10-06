import { validateRequest } from "@/auth";
import { CircleCheckBig } from "lucide-react";
import Link from "next/link";
import { SuccessModal } from "./SuccessModal";

export default async function Page() {
  const { user } = await validateRequest();

  return <SuccessModal user={user} />;
}
