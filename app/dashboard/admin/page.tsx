import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      This is Admin Page
      <Link href="/dashboard/admin/register">Register a new User</Link>
    </div>
  );
};

export default page;
