import React from "react";
import { auth } from "@/utils/auth";
import { headers } from "next/headers";
const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  // console.log("Session: ", session);
  return (
    <div>
      <h1>Dashboard</h1>
      <h4>{`Hello ${session?.user.email}`}</h4>
    </div>
  );
};

export default page;
