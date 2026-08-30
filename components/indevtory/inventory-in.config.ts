// components/inventory/inventory-in.config.ts

import { InsertGoodsInwardInputType } from "@/lib/zod/zod.godown.transaction";

// Export the type so our other components know exactly what a field looks like
export type FieldConfig = {
  name: keyof InsertGoodsInwardInputType;
  label: string;
  placeholder: string;
  type: "text" | "select" | "number";
  span?: "full" | "half" | "third";
  options?: { label: string; value: string }[];
};

export const GOODS_INWARD_FIELDS: FieldConfig[] = [
  // Core Details
  {
    name: "receiptNumber",
    label: "Receipt Number",
    placeholder: "SDC00982",
    type: "text",
  },
  {
    name: "depositorId",
    label: "Depositor ID",
    placeholder: "798956...",
    type: "text",
  },
  {
    name: "commodityId",
    label: "Commodity ID",
    placeholder: "78555...",
    type: "text",
  },
  {
    name: "locationId",
    label: "Location ID",
    placeholder: "78555...",
    type: "text",
  },

  // Transport Details
  {
    name: "truckNumber",
    label: "Truck Number",
    placeholder: "AS-01-BS-2003",
    type: "text",
  },
  {
    name: "driverName",
    label: "Driver Name",
    placeholder: "Ankur Dan",
    type: "text",
  },
  {
    name: "gatePassNumber",
    label: "Gate Pass Number",
    placeholder: "GP-1029",
    type: "text",
  },

  // Weight & Metrics
  {
    name: "grossWeightKg",
    label: "Gross Weight (kg)",
    placeholder: "2650",
    type: "number",
  },
  {
    name: "tareWeightKg",
    label: "Tare Weight (kg)",
    placeholder: "230",
    type: "number",
  },
  {
    name: "netWeightKg",
    label: "Net Weight (kg)",
    placeholder: "2420",
    type: "number",
  },
  { name: "bagCount", label: "Total Bags", placeholder: "243", type: "number" },

  // Status & Remarks
  {
    name: "status",
    label: "Status",
    placeholder: "Select Status",
    type: "select",
    options: [
      { label: "Pending", value: "PENDING" },
      { label: "Completed", value: "COMPLETED" },
      { label: "Cancelled", value: "CANCELLED" },
    ],
  },
  {
    name: "remarks",
    label: "Remarks",
    placeholder: "Any additional notes...",
    type: "text",
    span: "full",
  },
];
