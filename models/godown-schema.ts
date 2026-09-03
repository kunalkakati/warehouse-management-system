import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  numeric,
  timestamp,
  pgEnum,
  uniqueIndex,
  boolean,
} from "drizzle-orm/pg-core";

// -------------------------------------------------------------
// ENUMS
// -------------------------------------------------------------
export const unitOfMeasureEnum = pgEnum("unit_of_measure", [
  "BAGS",
  "KGS",
  "QUINTALS",
  "TONNES",
]);

export const agencyTypeEnum = pgEnum("agency_type", [
  "GOVERNMENT",
  "PRIVATE_TRADER",
  "FARMER_COOPERATIVE",
  "CORPORATE",
  "OTHER",
]);

export const transactionStatusEnum = pgEnum("transaction_status", [
  "PENDING",
  "VERIFIED",
  "COMPLETED",
  "CANCELLED",
]);

export const godowns = pgTable("godowns", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(), // e.g., "Amingaon Main Depot"
  code: varchar("code", { length: 50 }).notNull().unique(), // e.g., "GWY-01"
  managerName: varchar("manager_name", { length: 150 }),
  totalCapacityMt: numeric("total_capacity_mt", { precision: 10, scale: 2 }), // Total capacity in Metric Tons
  address: text("address"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// -------------------------------------------------------------
// 1. DEPOSITORS (Who owns the stock)
// -------------------------------------------------------------
export const depositors = pgTable("depositors", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  agencyType: agencyTypeEnum("agency_type").notNull().default("PRIVATE_TRADER"),
  godown_code: varchar("godown_code", { length: 50 })
    .notNull()
    .default("GHY-21")
    .references(() => godowns.code, { onDelete: "restrict" }),
  gstin: varchar("gstin", { length: 15 }),
  contactPerson: varchar("contact_person", { length: 150 }),
  phone: varchar("phone", { length: 20 }).notNull(),
  email: varchar("email", { length: 255 }),
  address: text("address"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// -------------------------------------------------------------
// 2. COMMODITIES (What is being stored)
// -------------------------------------------------------------
export const commodities = pgTable("commodities", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(), // e.g., "Paddy Grade A", "Urea"
  category: varchar("category", { length: 100 }).notNull(), // e.g., "Food Grains", "Fertilizers"
  standardUnit: unitOfMeasureEnum("standard_unit").notNull().default("BAGS"),
  standardBagWeightKg: numeric("standard_bag_weight_kg", {
    precision: 8,
    scale: 2,
  }), // e.g., 50.00 kg
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// -------------------------------------------------------------
// 3. GODOWN LOCATIONS (Physical storage bins/stacks)
// -------------------------------------------------------------
export const godownLocations = pgTable(
  "godown_locations",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    godownId: uuid("godown_id")
      .notNull()
      .references(() => godowns.id, { onDelete: "restrict" }), // e.g., "Godown 2A"
    stackNumber: varchar("stack_number", { length: 50 }).notNull(), // e.g., "Stack 14"
    maxCapacityKg: integer("max_capacity_kg").notNull(),
    isFumigated: boolean("is_fumigated").default(false).notNull(),
    lastFumigatedAt: timestamp("last_fumigated_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("godown_stack_uidx").on(table.godownId, table.stackNumber),
  ],
);

// -------------------------------------------------------------
// 4. GOODS INWARD (Intake Transactions)
// -------------------------------------------------------------
export const goodsInward = pgTable("goods_inward", {
  id: uuid("id").defaultRandom().primaryKey(),
  receiptNumber: varchar("receipt_number", { length: 100 }).notNull().unique(), // e.g., "CWC-IN-2026-001"
  depositorId: uuid("depositor_id")
    .notNull()
    .references(() => depositors.id, { onDelete: "restrict" }),
  commodityId: uuid("commodity_id")
    .notNull()
    .references(() => commodities.id, { onDelete: "restrict" }),
  locationId: uuid("location_id")
    .notNull()
    .references(() => godownLocations.id, { onDelete: "restrict" }),

  // Transport & Logistics
  truckNumber: varchar("truck_number", { length: 50 }).notNull(),
  driverName: varchar("driver_name", { length: 150 }),
  gatePassNumber: varchar("gate_pass_number", { length: 100 }),

  // Weights & Counts
  grossWeightKg: numeric("gross_weight_kg", {
    precision: 12,
    scale: 2,
  }).notNull(),
  tareWeightKg: numeric("tare_weight_kg", {
    precision: 12,
    scale: 2,
  }).notNull(),
  netWeightKg: numeric("net_weight_kg", { precision: 12, scale: 2 }).notNull(),
  bagCount: integer("bag_count").notNull(),

  status: transactionStatusEnum("status").notNull().default("COMPLETED"),
  receivedAt: timestamp("received_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  remarks: text("remarks"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// -------------------------------------------------------------
// 5. GOODS OUTWARD (Dispatch Transactions)
// -------------------------------------------------------------
export const goodsOutward = pgTable("goods_outward", {
  id: uuid("id").defaultRandom().primaryKey(),
  dispatchNumber: varchar("dispatch_number", { length: 100 })
    .notNull()
    .unique(), // e.g., "CWC-OUT-2026-001"
  releaseOrderNumber: varchar("release_order_number", {
    length: 100,
  }).notNull(), // Authorized Delivery Order No
  depositorId: uuid("depositor_id")
    .notNull()
    .references(() => depositors.id, { onDelete: "restrict" }),
  commodityId: uuid("commodity_id")
    .notNull()
    .references(() => commodities.id, { onDelete: "restrict" }),
  locationId: uuid("location_id")
    .notNull()
    .references(() => godownLocations.id, { onDelete: "restrict" }),

  // Transport & Logistics
  truckNumber: varchar("truck_number", { length: 50 }).notNull(),
  driverName: varchar("driver_name", { length: 150 }),
  gatePassNumber: varchar("gate_pass_number", { length: 100 }),

  // Dispatched quantities
  netWeightKg: numeric("net_weight_kg", { precision: 12, scale: 2 }).notNull(),
  bagCount: integer("bag_count").notNull(),

  status: transactionStatusEnum("status").notNull().default("COMPLETED"),
  dispatchedAt: timestamp("dispatched_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  remarks: text("remarks"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// -------------------------------------------------------------
// 6. STOCK LEDGER (Real-Time Current Balance)
// -------------------------------------------------------------
export const stockLedger = pgTable(
  "stock_ledger",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    depositorId: uuid("depositor_id")
      .notNull()
      .references(() => depositors.id, { onDelete: "restrict" }),
    commodityId: uuid("commodity_id")
      .notNull()
      .references(() => commodities.id, { onDelete: "restrict" }),
    locationId: uuid("location_id")
      .notNull()
      .references(() => godownLocations.id, { onDelete: "restrict" }),
    godownCode: varchar("godown_code", { length: 50 })
      .notNull()
      .default("GHY-21")
      .references(() => godowns.code, { onDelete: "restrict" }),

    // Live stock snapshot for this (Depositor + Commodity + Stack)
    currentBags: integer("current_bags").notNull().default(0),
    currentWeightKg: numeric("current_weight_kg", { precision: 12, scale: 2 })
      .notNull()
      .default("0.00"),

    lastUpdated: timestamp("last_updated", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    // Unique composite index: each depositor's commodity in a specific stack has exactly ONE row
    uniqueIndex("unique_stock_entry_idx").on(
      table.depositorId,
      table.commodityId,
      table.locationId,
    ),
  ],
);
