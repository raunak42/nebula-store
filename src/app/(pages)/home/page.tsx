import { validateRequest } from "@/auth";

export default async function Page() {
  const { user, session } = await validateRequest();

  return <div>{user?.username}</div>;
}
