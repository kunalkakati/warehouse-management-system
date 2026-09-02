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
  console.log("Godown Data: ", godownData);

  return (
    <div>
      <h1>Dashboard</h1>
      <h4>{`Hello ${session?.user.name}`}</h4>
      <GodownInsight data={godownData} />
    </div>
  );
};

export default page;
