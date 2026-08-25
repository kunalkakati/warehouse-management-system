// src/app/actions/outward.ts
"use server";

import { db } from "@/lib/db";
import { goodsOutward, stockLedger } from "@/models/godown-schema";
import { sql, eq, and } from "drizzle-orm";

interface OutwardPayload {
  dispatchNumber: string;
  releaseOrderNumber: string;
  depositorId: string;
  commodityId: string;
  locationId: string;
  truckNumber: string;
  netWeightKg: string;
  bagCount: number;
}

export async function processGoodsOutward(payload: OutwardPayload) {
  return await db.transaction(async (tx) => {
    // READ & LOCK: Fetch the current stock and lock the row
    const [currentStock] = await tx
      .select()
      .from(stockLedger)
      .where(
        and(
          eq(stockLedger.depositorId, payload.depositorId),
          eq(stockLedger.commodityId, payload.commodityId),
          eq(stockLedger.locationId, payload.locationId),
        ),
      )
      .for("update"); // Locks this specific row until the transaction finishes

    // CHECK: Validate that stock exists and is sufficient
    if (!currentStock) {
      throw new Error("No stock ledger entry found for this combination.");
    }

    if (currentStock.currentBags < payload.bagCount) {
      throw new Error(
        `Insufficient stock. Requested: ${payload.bagCount} bags, Available: ${currentStock.currentBags} bags.`,
      );
    }

    if (Number(currentStock.currentWeightKg) < Number(payload.netWeightKg)) {
      throw new Error("Insufficient weight available in this stack.");
    }

    // WRITE: Update the Stock Ledger (Subtract)
    await tx
      .update(stockLedger)
      .set({
        currentBags: sql`${stockLedger.currentBags} - ${payload.bagCount}`,
        currentWeightKg: sql`${stockLedger.currentWeightKg} - ${payload.netWeightKg}::numeric`,
        lastUpdated: new Date(),
      })
      .where(eq(stockLedger.id, currentStock.id));

    // WRITE: Log the outward dispatch receipt
    const [dispatchRecord] = await tx
      .insert(goodsOutward)
      .values(payload)
      .returning();

    return dispatchRecord;
  });
}
