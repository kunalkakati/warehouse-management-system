import React from "react";
import Registration from "@/components/Registration";
import { headers } from "next/headers";
import { auth } from "@/utils/auth";

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const isSuperAdmin = session?.user?.superAdmin ?? null;
  return (
    <div>
      <Registration isSuperAdmin={isSuperAdmin} />
    </div>
  );
};

export default page;
