import { logout } from "@/app/lib/actions";

export default async function Page() {
  return (
    <form action={logout}>
      <button className="p-4 rounded-full border-2 border-black">Sign out</button>
    </form>
  );
}

