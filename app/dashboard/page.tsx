import React from "react";
import { getGodownInfoByGodownId } from "@/lib/actions/godown-action";
import { redirect } from "next/navigation";
import GodownInsight from "@/components/dashboard/GodownInsight";
import { getSession } from "@/lib/auth-session";

const DashboardContent = async () => {
  const session = await getSession();

  const godownData = session?.user.godownCode
    ? await getGodownInfoByGodownId(session?.user.godownCode)
    : "NAN";
  if (godownData == "NAN") {
    redirect("/");
  }

  return <GodownInsight data={godownData} />;
};

const page = () => {
  return (
    <div>
      <DashboardContent />
    </div>
  );
};

export default page;
