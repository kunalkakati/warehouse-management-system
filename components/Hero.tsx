import React from "react";
import Link from "next/link";
const Hero = () => {
  return (
    <div>
      <h1>Hero Page</h1>
      <h6>This is Hero page, a generic site which everyone can visit</h6>
      <Link href="/auth/login">Official Login</Link>
      <Link href="/auth/register">Register</Link>
    </div>
  );
};

export default Hero;
