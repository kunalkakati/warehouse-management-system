import Hero from "@/components/Hero";
import { auth } from "@/utils/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
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
