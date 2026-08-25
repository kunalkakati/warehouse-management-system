import { defineRelations } from "drizzle-orm";
import {
  godowns,
  depositors,
  goodsInward,
  goodsOutward,
  stockLedger,
  godownLocations,
  commodities,
} from "./godown-schema";

// 1. Group all your tables into a single schema object
const schema = {
  godowns,
  depositors,
  goodsInward,
  goodsOutward,
  stockLedger,
  godownLocations,
  commodities,
};

// 2. Define all relations in one single export using the 'r' helper
export const schemaRelations = defineRelations(schema, (r) => ({
  // Masters (One-to-Many side)
  godowns: {
    locations: r.many.godownLocations(),
  },
  depositors: {
    inwardReceipts: r.many.goodsInward(),
    outwardDispatches: r.many.goodsOutward(),
    stockHoldings: r.many.stockLedger(),
  },

  commodities: {
    inwardReceipts: r.many.goodsInward(),
    outwardDispatches: r.many.goodsOutward(),
    stockHoldings: r.many.stockLedger(),
  },

  godownLocations: {
    godown: r.one.godowns({
      from: r.godownLocations.godownId,
      to: r.godowns.id,
    }),
    inwardReceipts: r.many.goodsInward(),
    outwardDispatches: r.many.goodsOutward(),
    stockHoldings: r.many.stockLedger(),
  },

  // Transactions (Many-to-One side - Requires explicitly defining the foreign keys)
  goodsInward: {
    depositor: r.one.depositors({
      from: r.goodsInward.depositorId,
      to: r.depositors.id,
    }),
    commodity: r.one.commodities({
      from: r.goodsInward.commodityId,
      to: r.commodities.id,
    }),
    location: r.one.godownLocations({
      from: r.goodsInward.locationId,
      to: r.godownLocations.id,
    }),
  },

  goodsOutward: {
    depositor: r.one.depositors({
      from: r.goodsOutward.depositorId,
      to: r.depositors.id,
    }),
    commodity: r.one.commodities({
      from: r.goodsOutward.commodityId,
      to: r.commodities.id,
    }),
    location: r.one.godownLocations({
      from: r.goodsOutward.locationId,
      to: r.godownLocations.id,
    }),
  },

  stockLedger: {
    depositor: r.one.depositors({
      from: r.stockLedger.depositorId,
      to: r.depositors.id,
    }),
    commodity: r.one.commodities({
      from: r.stockLedger.commodityId,
      to: r.commodities.id,
    }),
    location: r.one.godownLocations({
      from: r.stockLedger.locationId,
      to: r.godownLocations.id,
    }),
  },
}));
