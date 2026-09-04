import React from "react";
import InventoryLedger from "@/components/indevtory/InventoryLedger";
import { getTotalGoodsFromGodownByGodownCode } from "@/lib/actions/godown-action";
import { getSession } from "@/lib/auth-session";
import { Suspense } from "react";

const InventoryContent = async () => {
  const session = await getSession();
  const occupiedGoods = await getTotalGoodsFromGodownByGodownCode(
    session?.user?.godownCode || "NOT SET",
  );

  const hasData = Array.isArray(occupiedGoods) && occupiedGoods.length > 0;

  return hasData ? (
    <InventoryLedger data={occupiedGoods} />
  ) : (
    <div className="flex h-[50vh] flex-col items-center justify-center text-stone-500">
      <p className="text-lg font-medium">No Goods Found</p>
      <p className="mt-1 text-sm">
        There are currently no items in the inventory ledger.
      </p>
    </div>
  );
};

export default function InventoryPage() {
  return (
    <div className="min-h-screen py-8">
      <Suspense
        fallback={
          <div className="h-[50vh] animate-pulse rounded-xl bg-muted" />
        }
      >
        <InventoryContent />
      </Suspense>
    </div>
  );
}
