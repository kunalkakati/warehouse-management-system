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
