import Link from "next/link";
import React from "react";
import Logout from "@/components/Logout";
const page = () => {
  return (
    <div>
      This is Admin Page
      <Link href="/admin/register">Register a new User</Link>
      <Logout />
    </div>
  );
};

export default page;
