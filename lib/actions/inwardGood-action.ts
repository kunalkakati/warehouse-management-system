"use server";
// Example: Receiving Goods (Next.js Server Action)

import { db } from "@/lib/db";
import { goodsInward, stockLedger } from "@/models/godown-schema";
import { sql } from "drizzle-orm";
import { NewGoodsInward } from "@/types/type";

export async function processGoodsInward(payload: NewGoodsInward) {
  // Use db.transaction to ensure both operations succeed or both fail
  return await db.transaction(async (tx) => {
    // 1. Log the receipt
    const [receipt] = await tx.insert(goodsInward).values(payload).returning();

    // 2. Update the Stock Ledger using an "Upsert"
    // If the record exists, it updates the quantity. If it doesn't, it creates a new one.
    await tx
      .insert(stockLedger)
      .values({
        depositorId: payload.depositorId,
        commodityId: payload.commodityId,
        locationId: payload.locationId,
        currentBags: payload.bagCount,
        currentWeightKg: payload.netWeightKg,
      })
      .onConflictDoUpdate({
        target: [
          stockLedger.depositorId,
          stockLedger.commodityId,
          stockLedger.locationId,
        ],
        set: {
          currentBags: sql`${stockLedger.currentBags} + ${payload.bagCount}`,
          currentWeightKg: sql`${stockLedger.currentWeightKg} + ${payload.netWeightKg}::numeric`,
          lastUpdated: new Date(),
        },
      });

    return receipt;
  });
}
