import React, { Suspense } from "react";
import { getGodownInfoByGodownId } from "@/lib/actions/godown-action";
import { redirect } from "next/navigation";
import GodownInsight from "@/components/dashboard/GodownInsight";
import GodownInsightSkeleton from "@/components/skeletons/GodownInsightSkeleton";
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
      <Suspense fallback={<GodownInsightSkeleton />}>
        <DashboardContent />
      </Suspense>
    </div>
  );
};

export default page;
