"use server";

import { db } from "@/lib/db";
import {
  godowns,
  depositors,
  commodities,
  godownLocations,
} from "@/models/godown-schema";

import {
  NewGodown,
  NewDepositor,
  NewCommodity,
  NewGodownLocation,
} from "@/types/type";
import { eq } from "drizzle-orm";
import {
  requireGodownAccess,
  requireRole,
  requireSession,
} from "@/lib/authorization";

// Create

export const CreateGodown = async (data: NewGodown) => {
  await requireRole(["admin"]);
  try {
    const newGodown = await db.insert(godowns).values(data).returning();
    return newGodown;
  } catch (error) {
    throw error;
  }
};

export const CreateDepositor = async (data: NewDepositor) => {
  const session = await requireRole(["manager", "admin"]);
  requireGodownAccess(session, data.godown_code);
  try {
    const newDepositor = await db.insert(depositors).values(data).returning();
    return newDepositor;
  } catch (error) {
    throw error;
  }
};

export const CreateCommoditie = async (data: NewCommodity) => {
  await requireRole(["manager", "admin"]);
  try {
    const newCommoditie = await db.insert(commodities).values(data).returning();
    return newCommoditie;
  } catch (error) {
    throw error;
  }
};

export const CreateGodownLocation = async (data: NewGodownLocation) => {
  await requireRole(["admin"]);
  try {
    const newGodownLocation = await db
      .insert(godownLocations)
      .values(data)
      .returning();
    return newGodownLocation;
  } catch (error) {
    throw error;
  }
};

// Fetch:

export const getGodownInfoByGodownId = async (gid: string) => {
  const session = await requireSession();
  requireGodownAccess(session, gid);
  try {
    const stockForGodown = await db.query.stockLedger.findMany({
      where: (stockLedger, { eq }) => eq(stockLedger.godownCode, gid),
      with: {
        depositor: true,
        commodity: true,
        location: true,
        godown: true,
      },
    });
    return stockForGodown;
  } catch (error) {
    throw error;
  }
};

export const GetAllDepositorsByGodownCode = async (godownCode: string) => {
  const session = await requireSession();
  requireGodownAccess(session, godownCode);
  try {
    const AllDepositors = await db.query.depositors.findMany({
      where: (depositors, { eq }) => eq(depositors.godown_code, godownCode),
      with: {
        godown: true,
      },
    });
    return AllDepositors;
  } catch (error) {
    throw error;
  }
};

export const GetDepositorById = async (id: string) => {
  const session = await requireSession();
  try {
    const depositor = await db
      .select()
      .from(depositors)
      .where(eq(depositors.id, id));
    if (depositor[0]) requireGodownAccess(session, depositor[0].godown_code);
    return depositor;
  } catch (error) {
    throw error;
  }
};

export const getTotalGoodsFromGodownByGodownCode = async (
  godownCode: string,
) => {
  const session = await requireSession();
  requireGodownAccess(session, godownCode);
  try {
    const goods = await db.query.stockLedger.findMany({
      where: (stockLedger, { eq }) => eq(stockLedger.godownCode, godownCode),
      with: {
        depositor: true,
      },
    });
    return goods;
  } catch (error) {
    throw error;
  }
};

// Marged Types
export type GoodsandDepositorTypes = Awaited<
  ReturnType<typeof getTotalGoodsFromGodownByGodownCode>
>;

export type GodownAndLocationType = Awaited<
  ReturnType<typeof getGodownInfoByGodownId>
>;
