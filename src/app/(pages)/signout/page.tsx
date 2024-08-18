import { logout } from "@/app/lib/actions";
import { SignOutButton } from "./signOutButton";

export default async function Page() {
  return (
    <form className="w-full h-[50vh] mt-[80px] p-[32px]" action={logout}>
      <SignOutButton />{" "}
    </form>
  );
}
