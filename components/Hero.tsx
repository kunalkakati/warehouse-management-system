"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
const { data: session } = await authClient.getSession();

const Hero = () => {
  const router = useRouter();
  if (session) {
    router.push("/dashboard");
  }
  return (
    <div>
      <h1>Hero Page</h1>
      <p>{`Hello ${session?.user.name}`}</p>
      <h6>This is Hero page, a generic site which everyone can visit</h6>
      <Link href="/auth/login">Official Login</Link>
      <Link href="/auth/register">Register</Link>
    </div>
  );
};

export default Hero;
