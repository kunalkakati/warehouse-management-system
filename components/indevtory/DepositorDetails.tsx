"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Depositor } from "@/types/type";
import { Building2, Mail, MapPin, Phone, Receipt, User } from "lucide-react";

// Helper component for consistent, modern data cards
const InfoCard = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex items-start gap-3 rounded-xl border border-neutral-200 bg-neutral-50/50 p-3.5 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/50 dark:hover:bg-neutral-900">
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm dark:bg-neutral-800">
      <Icon className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
    </div>
    <div className="flex flex-col space-y-1">
      <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
        {label}
      </span>
      <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
        {value || "Not provided"}
      </span>
    </div>
  </div>
);

const DepositorDetails = ({ depositor }: { depositor: Depositor }) => {
  // Safely format dates to avoid errors if the dates are invalid or missing
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(date));
  };

  return (
    <Dialog>
      <DialogTrigger className="inline-flex items-center font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-neutral-900 dark:text-neutral-100 dark:decoration-neutral-700 dark:hover:decoration-neutral-100">
        {depositor.name}
      </DialogTrigger>

      <DialogContent className="max-w-md sm:max-w-2xl">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="text-2xl font-bold tracking-tight">
            {depositor.name}
          </DialogTitle>
          <DialogDescription className="text-sm text-neutral-500 dark:text-neutral-400">
            Contract signed on{" "}
            <strong className="font-medium text-neutral-700 dark:text-neutral-300">
              {formatDate(depositor.createdAt)}
            </strong>
            {depositor.createdAt.getFullYear() !=
              depositor.updatedAt.getFullYear() && (
              <span>
                {" "}
                and renewed on{" "}
                <strong className="font-medium text-neutral-700 dark:text-neutral-300">
                  {formatDate(depositor.updatedAt)}
                </strong>
              </span>
            )}
            .
          </DialogDescription>
        </DialogHeader>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <InfoCard icon={Receipt} label="GSTIN" value={depositor.gstin} />
          <InfoCard
            icon={Building2}
            label="Agency Type"
            value={depositor.agencyType}
          />
          <InfoCard
            icon={User}
            label="Contact Person"
            value={depositor.contactPerson}
          />
          <InfoCard icon={Phone} label="Phone" value={depositor.phone} />
          <InfoCard
            icon={Mail}
            label="Email"
            value={
              <a href={`mailto:${depositor.email}`} className="hover:underline">
                {depositor.email}
              </a>
            }
          />
          <InfoCard icon={MapPin} label="Address" value={depositor.address} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DepositorDetails;
