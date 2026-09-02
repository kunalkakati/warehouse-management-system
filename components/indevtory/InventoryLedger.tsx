"use client";

import React, { useMemo } from "react";
import { GoodsandDepositorTypes } from "@/lib/actions/godown-action";
import AgencyTypeChart, { AGENCY_CONFIG } from "./AgencyTypeChart";
import Link from "next/link";
import DepositorDetails from "./DepositorDetails";

interface InventoryLedgerProps {
  data: GoodsandDepositorTypes;
}

const formatKg = (value: number) => `${value.toLocaleString("en-IN")} kg`;

const AgencyTag = ({ agencyType }: { agencyType: string }) => {
  const config = AGENCY_CONFIG[agencyType];
  return (
    <span
      className="inline-flex items-center gap-1.5 text-sm font-medium"
      style={{ color: config?.color ?? "#6B6355" }}
    >
      <span
        aria-hidden
        className="h-1.5 w-1.5 shrink-0 rounded-full"
        style={{ backgroundColor: config?.color ?? "#8A8577" }}
      />
      {config?.label ?? agencyType}
    </span>
  );
};

const InventoryLedger = ({ data }: InventoryLedgerProps) => {
  const { totalGoods, agencyCounts, depositorCount } = useMemo(() => {
    const agencyCounts = {} as Record<string, number>;
    let totalGoods = 0;

    for (const item of data) {
      totalGoods += Number(item.currentWeightKg);
      const type = item.depositor.agencyType;
      agencyCounts[type] = (agencyCounts[type] || 0) + 1;
    }

    return { totalGoods, agencyCounts, depositorCount: data.length };
  }, [data]);

  const topAgency = Object.entries(agencyCounts).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="min-h-screen w-full bg-white  px-4 py-8 text-[#201C16] sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <header className="flex flex-col gap-4 border-b border-[#DEDAD0] pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-serif text-4xl font-semibold tracking-tight text-[#201C16] sm:text-[2.75rem]">
              Inventory Ledger
            </h1>
            <p className="mt-2 text-sm text-[#6B6355]">
              Warehouse holdings across every depositor account.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#6B6355]">
            <span className="h-2 w-2 rounded-full bg-[#5C7A3D]" />
            Updated live
          </div>
        </header>

        <section className="grid grid-cols-2 gap-6 border-b border-[#DEDAD0] py-6 sm:grid-cols-4">
          <div>
            <p className="text-sm text-[#6B6355]">Total weight</p>
            <p className="mt-1 font-serif text-2xl font-semibold tabular-nums">
              {formatKg(totalGoods)}
            </p>
          </div>
          <div className="sm:border-l sm:border-[#DEDAD0] sm:pl-6">
            <p className="text-sm text-[#6B6355]">Depositors on record</p>
            <p className="mt-1 font-serif text-2xl font-semibold tabular-nums">
              {depositorCount}
            </p>
          </div>
          <div className="sm:border-l sm:border-[#DEDAD0] sm:pl-6">
            <p className="text-sm text-[#6B6355]">Agency types represented</p>
            <p className="mt-1 font-serif text-2xl font-semibold tabular-nums">
              {Object.keys(agencyCounts).length}
            </p>
          </div>
          <div className="sm:border-l sm:border-[#DEDAD0] sm:pl-6">
            <p className="text-sm text-[#6B6355]">Leading segment</p>
            <p className="mt-1 font-serif text-2xl font-semibold">
              {topAgency
                ? AGENCY_CONFIG[topAgency[0]]?.label || topAgency[0]
                : "N/A"}
            </p>
          </div>
        </section>

        <section className="grid gap-8 py-8 xl:grid-cols-[1.6fr_1fr]">
          <div className="overflow-hidden rounded-lg border border-[#DEDAD0]">
            <div className="flex items-center justify-between border-b border-[#DEDAD0] bg-[#F1EEE6] px-5 py-3">
              <h2 className="text-base font-semibold text-[#201C16]">
                Depositor records
              </h2>
              <span className="text-sm text-[#6B6355]">
                {depositorCount} total
              </span>
            </div>

            {data.length === 0 ? (
              <p className="px-5 py-12 text-center text-sm text-[#6B6355]">
                No depositor records found.
              </p>
            ) : (
              <ul className="divide-y divide-[#DEDAD0]">
                {data.map((item) => (
                  <li
                    key={item.id}
                    id={`depositor-${item.depositor.id}`}
                    className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-[#F8F6F1] sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                  >
                    <div className="min-w-0">
                      <div className="flex items-baseline gap-3">
                        <span className="text-xs tabular-nums text-[#6B6355]">
                          {item.depositor.id.split("-").pop() ||
                            item.depositor.id}
                        </span>

                        <DepositorDetails depositor={item.depositor} />
                      </div>
                      <p
                        className="mt-1 truncate text-sm text-[#6B6355] sm:max-w-[360px]"
                        title={item.depositor.address ?? "N/A"}
                      >
                        {item.depositor.address}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-6 sm:justify-end">
                      <AgencyTag agencyType={item.depositor.agencyType} />
                      <span className="text-sm font-semibold tabular-nums text-[#201C16]">
                        {formatKg(Number(item.currentWeightKg))}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <aside className="h-fit rounded-lg border border-[#DEDAD0]">
            <div className="border-b border-[#DEDAD0] bg-[#F1EEE6] px-5 py-3">
              <h2 className="text-base font-semibold text-[#201C16]">
                Agency split
              </h2>
            </div>
            <div className="px-5 py-5">
              <AgencyTypeChart data={agencyCounts} />
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
};

export default InventoryLedger;
