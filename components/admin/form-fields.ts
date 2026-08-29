export const LocationFormField: {
  name:
    | "godownId"
    | "stackNumber"
    | "maxCapacityKg" // Changed from maxCapacityBags to match schema
    | "isFumigated"
    | "lastFumigatedAt";
  label: string;
  placeholder: string;
  span?: "full" | "half";
  type: "text" | "date" | "checkbox";
}[] = [
  {
    name: "godownId",
    label: "Godown Id",
    placeholder: "GHY-21",
    span: "full",
    type: "text",
  },
  {
    name: "stackNumber",
    label: "Stack Number",
    placeholder: "B-16",
    span: "half",
    type: "text",
  },
  {
    name: "maxCapacityKg", // Changed here as well
    label: "Maximum Capacity (Kg)",
    placeholder: "300",
    span: "half",
    type: "text",
  },
  {
    name: "isFumigated",
    label: "Is Fumigated",
    placeholder: "True", // Adjusted placeholder
    span: "full",
    type: "checkbox",
  },
  {
    name: "lastFumigatedAt",
    label: "Last Fumigation date",
    placeholder: "Pick a date", // Adjusted placeholder
    span: "full",
    type: "date",
  },
];
