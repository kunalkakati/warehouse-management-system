"use client";

import React, { useMemo, useState } from "react";
import { Search, X, Package } from "lucide-react";
import { GoodsandDepositorTypes } from "@/lib/actions/godown-action";
import AgencyTypeChart, { AGENCY_CONFIG } from "./AgencyTypeChart";
import DepositorDetails from "./DepositorDetails";

interface InventoryLedgerProps {
  data: GoodsandDepositorTypes;
}

const formatKg = (value: number) => `${value.toLocaleString("en-IN")} kg`;

const AgencyTag = ({ agencyType }: { agencyType: string }) => {
  const config = AGENCY_CONFIG[agencyType];
  const color = config?.color ?? "#6B6B68";
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
      style={{ backgroundColor: `${color}1A`, color }}
    >
      <span
        aria-hidden
        className="h-1.5 w-1.5 shrink-0 rounded-full"
        style={{ backgroundColor: color }}
      />
      {config?.label ?? agencyType}
    </span>
  );
};

const InventoryLedger = ({ data }: InventoryLedgerProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [agencyFilter, setAgencyFilter] = useState<string | null>(null);

  const { totalGoods, totalBags, agencyCounts, depositorCount } =
    useMemo(() => {
      const agencyCounts = {} as Record<string, number>;
      let totalGoods = 0;
      let totalBags = 0;

      for (const item of data) {
        totalGoods += Number(item.currentWeightKg);
        totalBags += item.currentBags;
        const type = item.depositor.agencyType;
        agencyCounts[type] = (agencyCounts[type] || 0) + 1;
      }

      return {
        totalGoods,
        totalBags,
        agencyCounts,
        depositorCount: data.length,
      };
    }, [data]);

  const topAgency = Object.entries(agencyCounts).sort((a, b) => b[1] - a[1])[0];

  const filteredData = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return data.filter((item) => {
      const matchesQuery =
        !query ||
        item.depositor.name.toLowerCase().includes(query) ||
        item.depositor.phone?.toLowerCase().includes(query) ||
        item.depositor.gstin?.toLowerCase().includes(query) ||
        item.depositor.address?.toLowerCase().includes(query);
      const matchesAgency =
        !agencyFilter || item.depositor.agencyType === agencyFilter;
      return matchesQuery && matchesAgency;
    });
  }, [data, searchQuery, agencyFilter]);

  return (
    <div className="min-h-screen w-full bg-[#F7F7F5] px-4 py-8 text-gray-900 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1400px] space-y-6">
        {/* Header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
              Inventory Ledger
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Warehouse holdings across every depositor account.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full border bg-white px-3 py-1.5 text-xs font-medium text-gray-600">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2F7D5B]" />
            Updated live
          </div>
        </header>

        {/* Stat strip */}
        <section className="grid grid-cols-2 divide-x divide-y divide-gray-100 rounded-xl border bg-white sm:grid-cols-4 sm:divide-y-0">
          <Stat
            label="Total weight"
            value={formatKg(totalGoods)}
            dot="bg-[#2F5C8A]"
          />
          <Stat
            label="Total bags"
            value={totalBags.toLocaleString("en-IN")}
            dot="bg-[#D9660B]"
          />
          <Stat
            label="Depositors"
            value={String(depositorCount)}
            dot="bg-[#7A4FA3]"
          />
          <Stat
            label="Leading segment"
            value={
              topAgency
                ? AGENCY_CONFIG[topAgency[0]]?.label || topAgency[0]
                : "N/A"
            }
            dot="bg-[#2F7D5B]"
          />
        </section>

        {/* Main */}
        <section className="grid gap-6 xl:grid-cols-[1.7fr_1fr] xl:items-start">
          <div className="overflow-hidden rounded-xl border bg-white">
            <div className="space-y-3 border-b bg-gray-50/80 px-5 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-gray-900">
                  Depositor records
                </h2>
                <span className="text-sm text-gray-500">
                  {filteredData.length} of {depositorCount}
                </span>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative flex-1 sm:max-w-xs">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search name, phone, GSTIN..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full rounded-lg border border-gray-200 bg-white py-1.5 pl-9 pr-8 text-sm outline-none transition-colors focus:border-[#D9660B] focus:ring-1 focus:ring-[#D9660B]"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    onClick={() => setAgencyFilter(null)}
                    className={`rounded-full border px-2.5 py-1 text-xs font-medium transition-colors ${
                      agencyFilter === null
                        ? "border-transparent bg-gray-900 text-white"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    All
                  </button>
                  {Object.keys(AGENCY_CONFIG).map((key) => {
                    const config = AGENCY_CONFIG[key];
                    const active = agencyFilter === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setAgencyFilter(key)}
                        className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors"
                        style={
                          active
                            ? {
                                backgroundColor: config.color,
                                borderColor: config.color,
                                color: "white",
                              }
                            : { borderColor: "#E5E7EB", color: "#4B5563" }
                        }
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{
                            backgroundColor: active ? "white" : config.color,
                          }}
                        />
                        {config.shortLabel}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {filteredData.length === 0 ? (
              <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
                <Package className="h-6 w-6 text-gray-300" />
                <p className="mt-2 text-sm font-medium text-gray-900">
                  No records found
                </p>
                <p className="text-sm text-gray-500">
                  {searchQuery
                    ? `Nothing matches "${searchQuery}".`
                    : "No depositor records match the current filters."}
                </p>
              </div>
            ) : (
              <ul className="divide-y">
                {filteredData.map((item) => (
                  <li
                    key={item.id}
                    id={`depositor-${item.depositor.id}`}
                    className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-gray-50/60 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                  >
                    <div className="min-w-0">
                      <div className="flex items-baseline gap-3">
                        <span className="font-mono text-xs text-gray-400">
                          {item.depositor.id.split("-").pop() ||
                            item.depositor.id}
                        </span>
                        <DepositorDetails depositor={item.depositor} />
                      </div>
                      <p
                        className="mt-1 truncate text-sm text-gray-500 sm:max-w-[360px]"
                        title={item.depositor.address ?? "N/A"}
                      >
                        {item.depositor.address}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-5 sm:justify-end">
                      <AgencyTag agencyType={item.depositor.agencyType} />
                      <div className="text-right">
                        <div className="text-sm font-semibold tabular-nums text-gray-900">
                          {formatKg(Number(item.currentWeightKg))}
                        </div>
                        <div className="text-xs tabular-nums text-gray-400">
                          {item.currentBags.toLocaleString("en-IN")} bags
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <aside className="sticky top-6 h-fit rounded-xl border bg-white">
            <div className="border-b bg-gray-50/80 px-5 py-4">
              <h2 className="text-base font-semibold text-gray-900">
                Agency split
              </h2>
              <p className="text-xs text-gray-500">Depositors by agency type</p>
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

function Stat({
  label,
  value,
  dot,
}: {
  label: string;
  value: string;
  dot: string;
}) {
  return (
    <div className="flex items-center gap-2.5 px-5 py-4">
      <span className={`h-2 w-2 shrink-0 rounded-full ${dot}`} />
      <div className="min-w-0">
        <div className="truncate text-lg font-semibold leading-tight tracking-tight text-gray-900">
          {value}
        </div>
        <div className="text-xs text-gray-500">{label}</div>
      </div>
    </div>
  );
}

export default InventoryLedger;
