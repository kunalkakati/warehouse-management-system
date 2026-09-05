"use server";

import { db } from "@/lib/db";
import {
  depositors,
  commodities,
  godowns,
  goodsInward,
  godownLocations,
  stockLedger,
} from "@/models/godown-schema";
import { eq, sql } from "drizzle-orm";
import {
  InsertGoodsInwardInputType,
  goodsInwardSchema,
} from "@/lib/zod/zod.godown.transaction";
import { requireGodownAccess, requireRole } from "@/lib/authorization";

export async function processGoodsInward(payload: InsertGoodsInwardInputType) {
  const session = await requireRole(["user", "manager", "admin"]);
  const validation = goodsInwardSchema.safeParse(payload);
  if (!validation.success) {
    throw new Error(validation.error.issues[0]?.message ?? "Invalid receipt.");
  }

  const data = validation.data;
  const grossWeightKg = Number(data.grossWeightKg);
  const tareWeightKg = Number(data.tareWeightKg);
  const netWeightKg = Number(data.netWeightKg);

  // The net weight recorded in the receipt must match the two scale readings.
  if (
    grossWeightKg < tareWeightKg ||
    netWeightKg !== grossWeightKg - tareWeightKg
  ) {
    throw new Error("Net weight must equal gross weight minus tare weight.");
  }

  return await db.transaction(async (tx) => {
    // The location is the source of truth for the warehouse, not a value supplied by the form.
    const [location] = await tx
      .select({
        godownCode: godowns.code,
      })
      .from(godownLocations)
      .innerJoin(godowns, eq(godownLocations.godownId, godowns.id))
      .where(eq(godownLocations.id, data.locationId));

    if (!location) {
      throw new Error("Storage location was not found.");
    }
    requireGodownAccess(session, location.godownCode);

    const [depositor] = await tx
      .select({ godownCode: depositors.godown_code })
      .from(depositors)
      .where(eq(depositors.id, data.depositorId));
    if (!depositor || depositor.godownCode !== location.godownCode) {
      throw new Error(
        "Depositor and storage location belong to different godowns.",
      );
    }

    const [commodity] = await tx
      .select({ id: commodities.id })
      .from(commodities)
      .where(eq(commodities.id, data.commodityId));
    if (!commodity) {
      throw new Error("Commodity was not found.");
    }

    // Save the receipt and update the balance in one transaction.
    const [receipt] = await tx.insert(goodsInward).values(data).returning();

    await tx
      .insert(stockLedger)
      .values({
        depositorId: data.depositorId,
        commodityId: data.commodityId,
        locationId: data.locationId,
        godownCode: location.godownCode,
        currentBags: data.bagCount,
        currentWeightKg: data.netWeightKg,
      })
      .onConflictDoUpdate({
        target: [
          stockLedger.depositorId,
          stockLedger.commodityId,
          stockLedger.locationId,
        ],
        set: {
          currentBags: sql`${stockLedger.currentBags} + ${data.bagCount}`,
          currentWeightKg: sql`${stockLedger.currentWeightKg} + ${data.netWeightKg}::numeric`,
          lastUpdated: new Date(),
        },
      });

    return receipt;
  });
}
