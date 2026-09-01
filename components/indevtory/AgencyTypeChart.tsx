"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";

export const AGENCY_CONFIG: Record<
  string,
  { label: string; shortLabel: string; color: string }
> = {
  PRIVATE_TRADER: {
    label: "Private Trader",
    shortLabel: "Private",
    color: "#5B5A8C",
  },
  GOVERNMENT: { label: "Government", shortLabel: "Govt", color: "#3C6178" },
  FARMER_COOPERATIVE: {
    label: "Farmer Co-op",
    shortLabel: "Farmers",
    color: "#5C7A3D",
  },
  CORPORATE: { label: "Corporate", shortLabel: "Corp", color: "#A8452F" },
  OTHER: { label: "Other", shortLabel: "Other", color: "#B8863A" },
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: { value?: number; payload?: { agencyType: string } }[];
  total: number;
}

const CustomTooltip = ({ active, payload, total }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const agencyKey = payload[0].payload?.agencyType ?? "";
    const config = AGENCY_CONFIG[agencyKey] || {
      label: agencyKey || "Unknown",
      color: "#8A8577",
    };
    const value = Number(payload[0].value ?? 0);
    const share = total > 0 ? Math.round((value / total) * 100) : 0;

    return (
      <div className="rounded-md border border-[#DEDAD0] bg-[#FAF9F5] px-3 py-2">
        <div className="flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: config.color }}
          />
          <p className="text-sm font-medium text-[#201C16]">{config.label}</p>
        </div>
        <p className="mt-1 text-xs text-[#6B6355]">
          {value} depositors · {share}% of total
        </p>
      </div>
    );
  }
  return null;
};

const AgencyTypeChart = ({ data }: { data: Record<string, number> }) => {
  const agencyData = Object.keys(AGENCY_CONFIG).map((key) => ({
    agencyType: key,
    counts: data[key] || 0,
  }));
  const total = agencyData.reduce((sum, entry) => sum + entry.counts, 0);

  return (
    <ResponsiveContainer width="100%" height={agencyData.length * 44 + 8}>
      <BarChart
        data={agencyData}
        layout="vertical"
        margin={{ top: 4, right: 28, left: 4, bottom: 4 }}
        barCategoryGap={10}
      >
        <XAxis type="number" hide />
        <YAxis
          type="category"
          dataKey="agencyType"
          tickLine={false}
          axisLine={false}
          width={78}
          tick={{ fill: "#4A4536", fontSize: 12, fontWeight: 500 }}
          tickFormatter={(value) => AGENCY_CONFIG[value]?.shortLabel || value}
        />
        <Tooltip
          cursor={{ fill: "rgba(32,28,22,0.04)" }}
          content={<CustomTooltip total={total} />}
        />
        <Bar dataKey="counts" radius={[0, 3, 3, 0]} barSize={16}>
          {agencyData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={AGENCY_CONFIG[entry.agencyType]?.color || "#C9C2B4"}
            />
          ))}
          <LabelList
            dataKey="counts"
            position="right"
            style={{ fill: "#201C16", fontSize: 12, fontWeight: 600 }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AgencyTypeChart;
