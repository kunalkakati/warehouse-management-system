// src/app/actions/outward.ts
"use server";

import { db } from "@/lib/db";
import {
  depositors,
  goodsOutward,
  godowns,
  godownLocations,
  stockLedger,
} from "@/models/godown-schema";
import { sql, eq, and } from "drizzle-orm";
import {
  goodsOutwardSchema,
  InsertGoodsOutwardInputType,
} from "@/lib/zod/zod.godown.transaction";
import { requireGodownAccess, requireRole } from "@/lib/authorization";

export async function processGoodsOutward(
  payload: InsertGoodsOutwardInputType,
) {
  const session = await requireRole(["user", "manager", "admin"]);
  const validation = goodsOutwardSchema.safeParse(payload);
  if (!validation.success) {
    throw new Error(validation.error.issues[0]?.message ?? "Invalid dispatch.");
  }
  const data = validation.data;

  return await db.transaction(async (tx) => {
    // Resolve the warehouse from the selected physical location before checking access.
    const [location] = await tx
      .select({ godownCode: godowns.code })
      .from(godownLocations)
      .innerJoin(godowns, eq(godownLocations.godownId, godowns.id))
      .where(eq(godownLocations.id, data.locationId));
    if (!location) throw new Error("Storage location was not found.");

    const [depositor] = await tx
      .select({ godownCode: depositors.godown_code })
      .from(depositors)
      .where(eq(depositors.id, data.depositorId));
    if (!depositor) throw new Error("Depositor was not found.");
    requireGodownAccess(session, depositor.godownCode);
    if (depositor.godownCode !== location.godownCode) {
      throw new Error(
        "Depositor and storage location belong to different godowns.",
      );
    }

    const [currentStock] = await tx
      .select()
      .from(stockLedger)
      .where(
        and(
          eq(stockLedger.depositorId, payload.depositorId),
          eq(stockLedger.commodityId, payload.commodityId),
          eq(stockLedger.locationId, data.locationId),
        ),
      )
      // Lock the balance so two dispatches cannot spend the same stock concurrently.
      .for("update");

    // CHECK: Validate that stock exists and is sufficient
    if (!currentStock) {
      throw new Error("No stock ledger entry found for this combination.");
    }

    if (currentStock.currentBags < data.bagCount) {
      throw new Error(
        `Insufficient stock. Requested: ${data.bagCount} bags, Available: ${currentStock.currentBags} bags.`,
      );
    }

    if (Number(currentStock.currentWeightKg) < Number(data.netWeightKg)) {
      throw new Error("Insufficient weight available in this stack.");
    }

    // WRITE: Update the Stock Ledger (Subtract)
    await tx
      .update(stockLedger)
      .set({
        currentBags: sql`${stockLedger.currentBags} - ${data.bagCount}`,
        currentWeightKg: sql`${stockLedger.currentWeightKg} - ${data.netWeightKg}::numeric`,
        lastUpdated: new Date(),
      })
      .where(eq(stockLedger.id, currentStock.id));

    // WRITE: Log the outward dispatch receipt
    const [dispatchRecord] = await tx
      .insert(goodsOutward)
      .values(data)
      .returning();

    return dispatchRecord;
  });
}
