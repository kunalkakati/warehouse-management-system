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

// Shared with the rest of the console: steel blue / plum / pine /
// safety orange / caution amber — a small, functional signage set
// rather than a decorative palette.
export const AGENCY_CONFIG: Record<
  string,
  { label: string; shortLabel: string; color: string }
> = {
  GOVERNMENT: { label: "Government", shortLabel: "Govt", color: "#2F5C8A" },
  PRIVATE_TRADER: {
    label: "Private Trader",
    shortLabel: "Private",
    color: "#7A4FA3",
  },
  FARMER_COOPERATIVE: {
    label: "Farmer Co-op",
    shortLabel: "Farmers",
    color: "#2F7D5B",
  },
  CORPORATE: { label: "Corporate", shortLabel: "Corp", color: "#D9660B" },
  OTHER: { label: "Other", shortLabel: "Other", color: "#B08900" },
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
      color: "#8A8A86",
    };
    const value = Number(payload[0].value ?? 0);
    const share = total > 0 ? Math.round((value / total) * 100) : 0;

    return (
      <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-sm">
        <div className="flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: config.color }}
          />
          <p className="text-sm font-medium text-gray-900">{config.label}</p>
        </div>
        <p className="mt-1 text-xs text-gray-500">
          {value} depositors, {share}% of total
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
          tick={{ fill: "#4B4B4B", fontSize: 12, fontWeight: 500 }}
          tickFormatter={(value) => AGENCY_CONFIG[value]?.shortLabel || value}
        />
        <Tooltip
          cursor={{ fill: "rgba(17,17,17,0.04)" }}
          content={<CustomTooltip total={total} />}
        />
        <Bar dataKey="counts" radius={[0, 4, 4, 0]} barSize={16}>
          {agencyData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={AGENCY_CONFIG[entry.agencyType]?.color || "#C4C4C0"}
            />
          ))}
          <LabelList
            dataKey="counts"
            position="right"
            style={{ fill: "#111111", fontSize: 12, fontWeight: 600 }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AgencyTypeChart;
