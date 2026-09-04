import Hero from "@/components/Hero";
import { getSession } from "@/lib/auth-session";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getSession();
  const role = session?.user.role;
  if (role === "admin") {
    redirect("/dashboard/admin"); // Admins start here
  }
  return (
    <div>
      <Hero />
    </div>
  );
}
