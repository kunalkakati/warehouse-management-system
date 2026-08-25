import { user } from "@/models/auth-schema";
import { InferSelectModel } from "drizzle-orm";
import {
  godowns,
  depositors,
  goodsInward,
  goodsOutward,
  stockLedger,
  godownLocations,
  commodities,
} from "@/models/godown-schema";

export type Employee = InferSelectModel<typeof user>;

export type FormState = {
  status: "idle" | "success" | "error"; // Strict literal types
  message: string;
  errors?: Record<string, string[]>;
  timestamp: number;
};

// -------------------------------------------------------------
// TYPESCRIPT TYPES (Inferred automatically by Drizzle)
// -------------------------------------------------------------
// 0. Godown
export type Godown = typeof godowns.$inferSelect;
export type NewGodown = typeof godowns.$inferInsert;
// 1. Depositors
export type Depositor = typeof depositors.$inferSelect;
export type NewDepositor = typeof depositors.$inferInsert;

// 2. Commodities
export type Commodity = typeof commodities.$inferSelect;
export type NewCommodity = typeof commodities.$inferInsert;

// 3. Godown Locations
export type GodownLocation = typeof godownLocations.$inferSelect;
export type NewGodownLocation = typeof godownLocations.$inferInsert;

// 4. Goods Inward (Receipts)
export type GoodsInward = typeof goodsInward.$inferSelect;
export type NewGoodsInward = typeof goodsInward.$inferInsert;

// 5. Goods Outward (Dispatches)
export type GoodsOutward = typeof goodsOutward.$inferSelect;
export type NewGoodsOutward = typeof goodsOutward.$inferInsert;

// 6. Stock Ledger
export type StockLedger = typeof stockLedger.$inferSelect;
export type NewStockLedger = typeof stockLedger.$inferInsert;
