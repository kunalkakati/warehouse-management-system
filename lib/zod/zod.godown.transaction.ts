import z from "zod";
const TransactionStatusEnum = z.enum(["PENDING", "COMPLETED", "CANCELLED"]);

// GOODS INWARD

export const goodsInwardSchema = z.object({
  receiptNumber: z.string().min(1, "Receipt number is required").max(100),

  depositorId: z.uuid("Invalid Depositor ID"),
  commodityId: z.uuid("Invalid Commodity ID"),
  locationId: z.uuid("Invalid Location ID"),

  truckNumber: z.string().min(1, "Truck number is required").max(50),
  driverName: z.string().max(150).optional().nullable(),
  gatePassNumber: z.string().max(100).optional().nullable(),

  // numeric(12, 2) -> max 10 digits before decimal, 2 after
  grossWeightKg: z
    .string()
    .regex(/^\d{1,10}(\.\d{1,2})?$/, "Invalid weight format"),
  tareWeightKg: z
    .string()
    .regex(/^\d{1,10}(\.\d{1,2})?$/, "Invalid weight format"),
  netWeightKg: z
    .string()
    .regex(/^\d{1,10}(\.\d{1,2})?$/, "Invalid weight format"),

  bagCount: z.coerce.number().int().nonnegative("Bag count cannot be negative"),

  status: TransactionStatusEnum.default("PENDING"),
  remarks: z.string().optional().nullable(),

  // Optional because DB has defaultNow()
  // receivedAt: z.coerce.date().optional(),
});

// GOODS OUTWARD
export const goodsOutwardSchema = z.object({
  dispatchNumber: z.string().min(1, "Dispatch number is required").max(100),
  releaseOrderNumber: z
    .string()
    .min(1, "Release order number is required")
    .max(100),

  depositorId: z.uuid("Invalid Depositor ID"),
  commodityId: z.uuid("Invalid Commodity ID"),
  locationId: z.uuid("Invalid Location ID"),

  truckNumber: z.string().min(1, "Truck number is required").max(50),
  driverName: z.string().max(150).optional().nullable(),
  gatePassNumber: z.string().max(100).min(1, "Gate Pass Number Nreuired"),

  // numeric(12, 2)
  netWeightKg: z
    .string()
    .regex(/^\d{1,10}(\.\d{1,2})?$/, "Invalid weight format"),

  bagCount: z.coerce.number().int().nonnegative("Bag count cannot be negative"),

  status: TransactionStatusEnum.default("PENDING"),
  remarks: z.string().optional().nullable(),

  // Optional because DB has defaultNow()
  // dispatchedAt: z.coerce.date().optional(),
});

// TYPES
export type InsertGoodsInward = z.infer<typeof goodsInwardSchema>;
export type InsertGoodsOutward = z.infer<typeof goodsOutwardSchema>;
