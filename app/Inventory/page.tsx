import React from "react";
import InventoryLedger from "@/components/indevtory/InventoryLedger";
import { getTotalGoodsFromGodownByGodownCode } from "@/lib/actions/godown-action";
import { auth } from "@/utils/auth"; // path to your Better Auth server instance
import { headers } from "next/headers";

export default async function InventoryPage() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  const occupiedGoods = await getTotalGoodsFromGodownByGodownCode(
    session?.user?.godownCode || "NOT SET",
  );

  // Check if occupiedGoods is an array and has data.
  const hasData = Array.isArray(occupiedGoods) && occupiedGoods.length > 0;

  return (
    <div className="min-h-screen py-8">
      {hasData ? (
        <InventoryLedger data={occupiedGoods} />
      ) : (
        <div className="flex h-[50vh] flex-col items-center justify-center text-stone-500">
          <p className="text-lg font-medium">No Goods Found</p>
          <p className="text-sm mt-1">
            There are currently no items in the inventory ledger.
          </p>
        </div>
      )}
    </div>
  );
}
