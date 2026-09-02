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
  Depositor,
  NewDepositor,
  NewCommodity,
  NewGodownLocation,
} from "@/types/type";
import { eq } from "drizzle-orm";

// Create

export const CreateGodown = async (data: NewGodown) => {
  try {
    const newGodown = await db.insert(godowns).values(data).returning();
    return newGodown;
  } catch (error) {
    throw error;
  }
};

export const CreateDepositor = async (data: NewDepositor) => {
  try {
    const newDepositor = await db.insert(depositors).values(data).returning();
    return newDepositor;
  } catch (error) {
    throw error;
  }
};

export const CreateCommoditie = async (data: NewCommodity) => {
  try {
    const newCommoditie = await db.insert(commodities).values(data).returning();
    return newCommoditie;
  } catch (error) {
    throw error;
  }
};

export const CreateGodownLocation = async (data: NewGodownLocation) => {
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

export const GetAllDepositors = async () => {
  try {
    const AllDepositors = await db.select().from(depositors);
    return AllDepositors;
  } catch (error) {
    throw error;
  }
};

export const GetDepositorById = async (id: string) => {
  try {
    const depositor = await db
      .select()
      .from(depositors)
      .where(eq(depositors.id, id));
    return depositor;
  } catch (error) {
    throw error;
  }
};

export const getTotalGoodsFromGodown = async () => {
  try {
    const goods = await db.query.stockLedger.findMany({
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
  ReturnType<typeof getTotalGoodsFromGodown>
>;

export type GodownAndLocationType = Awaited<
  ReturnType<typeof getGodownInfoByGodownId>
>;
