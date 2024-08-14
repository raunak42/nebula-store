import AuthCard from "@/app/components/AuthCard/AuthCard";
import { loginAndStartSession } from "@/app/lib/actions";


export default function Page() {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <form action={loginAndStartSession}>
        <AuthCard />
      </form>
    </div>
  );
}

