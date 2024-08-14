import AuthCard from "@/app/components/AuthCard/AuthCard";
import { signupAndStartSession } from "@/app/lib/actions";


export default function Page() {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <form action={signupAndStartSession}>
        <AuthCard />
      </form>
    </div>
  );
}

