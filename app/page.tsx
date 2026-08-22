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
    redirect("/admin"); // Admins start here
  } else {
    redirect("/dashboard"); // Everyone else starts here
  }
  return (
    <div>
      <h1>Role: {session?.user.role}</h1>
      <Hero />
    </div>
  );
}
