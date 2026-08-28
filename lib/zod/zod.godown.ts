import * as z from "zod";

const UnitOfMeasureEnum = z.enum(["BAGS", "KGS", "QUINTALS", "TONNES"]);
const AgencyTypeEnum = z.enum([
  "PRIVATE_TRADER",
  "GOVERNMENT",
  "FARMER_COOPERATIVE",
  "CORPORATE",
  "OTHER",
]);

//GODOWN
export const godownSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Godown should have at least 4 character." }),
  code: z
    .string()
    .min(3, { message: "Code Should containe at least 3 character" })
    .max(40, { message: "Code shoud not be more then 40 character" }),
  managerName: z
    .string()
    .min(4, { message: "Name should at least 4 character" })
    .max(150, {
      message: "Manager name should not be containe more then 150 character.",
    }),
  totalCapacityMt: z.coerce
    .number()
    .nonnegative() // capacity can't be negative
    .max(99999999.99, "Exceeds maximum precision of 10 digits") // 8 digits before, 2 after
    .refine((val) => /^\d+(\.\d{1,2})?$/.test(val.toString()), {
      message: "Must have a maximum of 2 decimal places",
    }),
  address: z.string().optional().nullable(),
});

//DEPOSITOR
export const DepositorSchema = z.object({
  name: z.string().min(1, "Name is required").max(255, "Name is too long"),

  agencyType: AgencyTypeEnum.default("OTHER"),

  gstin: z
    .string()
    .length(15, "GSTIN must be exactly 15 characters")
    .optional()
    .nullable(),

  contactPerson: z.string().max(150).optional().nullable(),

  phone: z
    .string()
    .length(10, "Phone number must be exactly 10 digits")
    .regex(/^\d{10}$/, "Phone number must contain only numbers"),

  // Zod can validate actual email format here
  email: z.email("Invalid email address format").max(255).optional().nullable(),

  address: z.string().optional().nullable(),
});

// COMMODITY
export const CommoditySchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  category: z.string().min(1, "Category is required").max(100),
  standardUnit: UnitOfMeasureEnum,

  // numeric(8, 2) -> max 6 digits before decimal, 2 after
  standardBagWeightKg: z
    .string()
    .regex(
      /^\d{1,6}(\.\d{1,2})?$/,
      "Must be a valid weight with up to 2 decimal places",
    )
    .optional()
    .nullable(),
});

//GODOWN LOCATION
export const GodownLocationSchema = z.object({
  godownId: z.uuid("Invalid Godown ID"),
  stackNumber: z.string().min(1, "Stack number is required").max(50),

  maxCapacityBags: z.coerce
    .number()
    .int()
    .nonnegative("Capacity cannot be negative"),

  // timestamp
  isFumigated: z.coerce.date().optional().nullable(),
});

// 5. STOCK LEDGER
// Note: Stock ledger is usually updated automatically via triggers or backend logic,
// Propabily never use it.
export const StockLedgerSchema = z.object({
  depositorId: z.uuid("Invalid Depositor ID"),
  commodityId: z.uuid("Invalid Commodity ID"),
  locationId: z.uuid("Invalid Location ID"),

  currentBags: z.coerce.number().int().nonnegative().default(0),

  // numeric(12, 2)
  currentWeightKg: z
    .string()
    .regex(/^\d{1,10}(\.\d{1,2})?$/, "Invalid weight format")
    .default("0.00"),
});

// Types.
export type godownSchemaType = z.infer<typeof godownSchema>;
export type DepositorSchemaType = z.input<typeof DepositorSchema>;
export type CommoditySchemaType = z.infer<typeof CommoditySchema>;
export type GodownLocationSchemaType = z.infer<typeof GodownLocationSchema>;
export type StockLedgerType = z.infer<typeof StockLedgerSchema>;
