import { DepositorSchemaType } from "@/lib/zod/zod.godown";

export const CommoditieFormFields: {
  name: "name" | "category" | "standardUnit" | "standardBagWeightKg";
  label: string;
  placeholder: string;
  span?: "full" | "half";
  type: "text" | "select";
  options?: { label: string; value: string }[];
}[] = [
  {
    name: "name",
    label: "Commoditie Name",
    placeholder: "Central Warehouse Alpha",
    span: "full",
    type: "text",
  },
  {
    name: "category",
    label: "Category",
    placeholder: "Grains",
    span: "half",
    type: "select",
    options: [
      { label: "Grain", value: "GRAIN" },
      { label: "Alcohol", value: "ALCOHOL" },
      { label: "Frozen Item", value: "FROZEN ITEM" },
      { label: "Electronics", value: "ELECTRONICS" },
    ],
  },
  {
    name: "standardUnit",
    label: "Standard Unit",
    placeholder: "KGS",
    span: "half",
    type: "select",
    options: [
      { label: "Bags", value: "BAGS" },
      { label: "kgs", value: "KGS" },
      { label: "Quintals", value: "QUINTALS" },
      { label: "tonnes", value: "TONNES" },
    ],
  },
  {
    name: "standardBagWeightKg",
    label: "Standard Bag Weight",
    placeholder: "50",
    span: "half",
    type: "text",
  },
];

export const DepositorFormFields: {
  name: keyof Omit<DepositorSchemaType, "agencyType">;
  label: string;
  placeholder: string;
  span?: "full" | "half";
}[] = [
  {
    name: "name",
    label: "Depositor Name",
    placeholder: "Central Warehouse Alpha",
    span: "full",
  },
  {
    name: "gstin",
    label: "GST Number",
    placeholder: "18AABCU9603R1ZM",
    span: "half",
  },
  {
    name: "contactPerson",
    label: "Contact Person",
    placeholder: "Rajesh Sharma",
    span: "half",
  },
  {
    name: "phone",
    label: "Phone Number",
    placeholder: "+91 98765 43210",
    span: "half",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "depositor@example.com",
    span: "half",
  },
  {
    name: "address",
    label: "Address",
    placeholder: "123 Market Road, Guwahati, Assam",
    span: "full",
  },
];
