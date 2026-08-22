"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";

const { data: session } = await authClient.getSession();
const Hero = () => {
  const router = useRouter();

  const logOut = async () => {
    console.log("Logout CLicked");
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/login"); // redirect to login page
        },
      },
    });
  };
  return (
    <div>
      <h1>Hero Page</h1>
      <p>{`Hello ${session?.user.name}`}</p>
      <h6>This is Hero page, a generic site which everyone can visit</h6>
      <Link href="/auth/login">Official Login</Link>
      <Link href="/auth/register">Register</Link>

      <div>
        <Button onClick={() => logOut()}>Log out</Button>
      </div>
    </div>
  );
};

export default Hero;
