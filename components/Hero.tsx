"use client";
import React from "react";
import Link from "next/link";
import { toast } from "sonner";
const Hero = () => {
  const showToast = () => {
    console.log("Toast button clicked");
    // Display a toast notification
    toast.success("This is a success message!");
  };
  return (
    <div>
      <h1>Hero Page</h1>
      <h6>This is Hero page, a generic site which everyone can visit</h6>
      <Link href="/auth/login">Official Login</Link>
      <Link href="/auth/register">Register</Link>
      <button onClick={showToast}>Toast</button>
    </div>
  );
};

export default Hero;
