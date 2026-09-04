import React from "react";
import { FormCardSkeleton } from "./FormCardSkeleton";

export default function FormSkeleton() {
  return (
    <FormCardSkeleton
      titleWidth="w-32"
      fields={[
        { span: "half" }, // Name
        { span: "half" }, // Contact Person
        { span: "half" }, // Phone
        { span: "half" }, // Email
        { span: "half" }, // GSTIN
        { span: "full" }, // Address
        { span: "full" }, // Agency Type Select
      ]}
      buttonWidth="w-36"
    />
  );
}
