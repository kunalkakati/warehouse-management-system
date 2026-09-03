import React from "react";
import { auth } from "@/utils/auth";
import { headers } from "next/headers";
import { getGodownInfoByGodownId } from "@/lib/actions/godown-action";
import { redirect } from "next/navigation";
import GodownInsight from "@/components/dashboard/GodownInsight";

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const godownData = session?.user.godownCode
    ? await getGodownInfoByGodownId(session?.user.godownCode)
    : "NAN";
  if (godownData == "NAN") {
    redirect("/");
  }

  return (
    <div>
      <GodownInsight data={godownData} />
    </div>
  );
};

export default page;
