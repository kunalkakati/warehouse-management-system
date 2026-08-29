import { relations } from "drizzle-orm";
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
// const schema = {
//   godowns,
//   depositors,
//   goodsInward,
//   goodsOutward,
//   stockLedger,
//   godownLocations,
//   commodities,
// };

// 2. Define all relations in one single export using the 'r' helper
export const godownsRelations = relations(godowns, ({ many }) => ({
  locations: many(godownLocations),
}));

export const depositorsRelations = relations(depositors, ({ many }) => ({
  inwardReceipts: many(goodsInward),
  outwardDispatches: many(goodsOutward),
  stockHoldings: many(stockLedger),
}));

export const commoditiesRelations = relations(commodities, ({ many }) => ({
  inwardReceipts: many(goodsInward),
  outwardDispatches: many(goodsOutward),
  stockHoldings: many(stockLedger),
}));

export const godownLocationsRelations = relations(
  godownLocations,
  ({ one, many }) => ({
    godown: one(godowns, {
      fields: [godownLocations.godownId],
      references: [godowns.id],
    }),
    inwardReceipts: many(goodsInward),
    outwardDispatches: many(goodsOutward),
    stockHoldings: many(stockLedger),
  }),
);

// --------------------------------------------------
// Transactions (Many-to-One side)
// --------------------------------------------------

export const goodsInwardRelations = relations(goodsInward, ({ one }) => ({
  depositor: one(depositors, {
    fields: [goodsInward.depositorId],
    references: [depositors.id],
  }),
  commodity: one(commodities, {
    fields: [goodsInward.commodityId],
    references: [commodities.id],
  }),
  location: one(godownLocations, {
    fields: [goodsInward.locationId],
    references: [godownLocations.id],
  }),
}));

export const goodsOutwardRelations = relations(goodsOutward, ({ one }) => ({
  depositor: one(depositors, {
    fields: [goodsOutward.depositorId],
    references: [depositors.id],
  }),
  commodity: one(commodities, {
    fields: [goodsOutward.commodityId],
    references: [commodities.id],
  }),
  location: one(godownLocations, {
    fields: [goodsOutward.locationId],
    references: [godownLocations.id],
  }),
}));

export const stockLedgerRelations = relations(stockLedger, ({ one }) => ({
  depositor: one(depositors, {
    fields: [stockLedger.depositorId],
    references: [depositors.id],
  }),
  commodity: one(commodities, {
    fields: [stockLedger.commodityId],
    references: [commodities.id],
  }),
  location: one(godownLocations, {
    fields: [stockLedger.locationId],
    references: [godownLocations.id],
  }),
}));
