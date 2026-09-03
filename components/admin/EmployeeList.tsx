"use client";

import React, { useMemo, useState } from "react";
import { Search, MapPin, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Matches the shape returned by getAllEmployee(). Move this into
// @/types/type and re-export if you'd rather keep types centralized.
export type Employee = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  role: string | null;
  banned: boolean | null;
  createdAt: Date;
  updatedAt: Date;
  godownCode: string;
  banReason: string | null;
  banExpires: Date | null;
  officeAddress: string | null;
  employeeId: string | null;
  godown: {
    id: string;
    name: string;
    code: string;
    managerName: string | null;
    totalCapacityMt: string | null;
    address: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
};

// Warehouse signage palette: saturated, functional colors rather than
// a single muted brand tint — closer to bin labels and floor markings
// than a typical SaaS badge set.
const ROLE_ACCENTS = [
  { text: "text-[#2F5C8A]", dot: "bg-[#2F5C8A]", bg: "bg-[#2F5C8A]/10" }, // steel blue
  { text: "text-[#7A4FA3]", dot: "bg-[#7A4FA3]", bg: "bg-[#7A4FA3]/10" }, // plum
  { text: "text-[#D9660B]", dot: "bg-[#D9660B]", bg: "bg-[#D9660B]/10" }, // safety orange
  { text: "text-[#B08900]", dot: "bg-[#B08900]", bg: "bg-[#B08900]/10" }, // caution amber
  { text: "text-[#2F7D5B]", dot: "bg-[#2F7D5B]", bg: "bg-[#2F7D5B]/10" }, // pine
];

function roleAccent(role: string | null) {
  if (!role)
    return { text: "text-gray-500", dot: "bg-gray-400", bg: "bg-gray-100" };
  let hash = 0;
  for (let i = 0; i < role.length; i++)
    hash = role.charCodeAt(i) + ((hash << 5) - hash);
  return ROLE_ACCENTS[Math.abs(hash) % ROLE_ACCENTS.length];
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

function Avatar({
  name,
  accentBg,
  accentText,
}: {
  name: string;
  accentBg: string;
  accentText: string;
}) {
  return (
    <div
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-medium ${accentBg} ${accentText}`}
    >
      {initials(name)}
    </div>
  );
}

function StatusPill({ banned }: { banned: boolean | null }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
        banned ? "bg-red-50 text-red-700" : "bg-[#2F7D5B]/10 text-[#2F7D5B]"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${banned ? "bg-red-500" : "bg-[#2F7D5B]"}`}
      />
      {banned ? "Suspended" : "Active"}
    </span>
  );
}

const EmployeeList = ({ data }: { data: Employee[] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string | null>(null);

  const roleCounts = useMemo(() => {
    const counts = new Map<string, number>();
    data.forEach((e) => {
      if (e.role) counts.set(e.role, (counts.get(e.role) ?? 0) + 1);
    });
    return counts;
  }, [data]);

  const roles = useMemo(() => Array.from(roleCounts.keys()), [roleCounts]);

  const filteredData = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return data.filter((employee) => {
      const matchesQuery =
        !query ||
        employee.name.toLowerCase().includes(query) ||
        employee.email.toLowerCase().includes(query) ||
        employee.officeAddress?.toLowerCase().includes(query) ||
        employee.employeeId?.toLowerCase().includes(query) ||
        employee.godown?.name.toLowerCase().includes(query) ||
        employee.godown?.code.toLowerCase().includes(query) ||
        employee.role?.toLowerCase().includes(query);
      const matchesRole = !roleFilter || employee.role === roleFilter;
      return matchesQuery && matchesRole;
    });
  }, [data, searchQuery, roleFilter]);

  const searchInput = (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Search className="h-4 w-4 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="Search employees..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="block w-full rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-9 text-sm outline-none transition-colors focus:border-[#D9660B] focus:ring-1 focus:ring-[#D9660B]"
      />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery("")}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );

  return (
    <div className="lg:grid lg:grid-cols-[220px_1fr] lg:items-start lg:gap-6">
      {/* Sidebar — desktop */}
      <aside className="sticky top-6 hidden space-y-5 lg:block">
        {searchInput}
        <div>
          <p className="px-1 text-xs font-medium text-gray-400">Roles</p>
          <div className="mt-2 space-y-0.5">
            <button
              onClick={() => setRoleFilter(null)}
              className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-sm transition-colors ${
                roleFilter === null
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              All roles
              <span
                className={
                  roleFilter === null ? "text-white/70" : "text-gray-400"
                }
              >
                {data.length}
              </span>
            </button>
            {roles.map((role) => {
              const accent = roleAccent(role);
              const active = roleFilter === role;
              return (
                <button
                  key={role}
                  onClick={() => setRoleFilter(role)}
                  className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-sm capitalize transition-colors ${
                    active
                      ? "bg-gray-900 text-white"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${active ? "bg-white" : accent.dot}`}
                    />
                    {role}
                  </span>
                  <span className={active ? "text-white/70" : "text-gray-400"}>
                    {roleCounts.get(role)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      <div className="min-w-0 space-y-4">
        {/* Toolbar — below lg only */}
        <div className="space-y-3 lg:hidden">
          {searchInput}
          {roles.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => setRoleFilter(null)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  roleFilter === null
                    ? "border-[#D9660B] bg-[#D9660B] text-white"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                All roles
              </button>
              {roles.map((role) => {
                const accent = roleAccent(role);
                const active = roleFilter === role;
                return (
                  <button
                    key={role}
                    onClick={() => setRoleFilter(role)}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium capitalize transition-colors ${
                      active
                        ? "border-transparent bg-gray-900 text-white"
                        : `border-gray-200 ${accent.text}`
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${active ? "bg-white" : accent.dot}`}
                    />
                    {role}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <p className="text-xs text-gray-500">
          {filteredData.length} of {data.length} employees
        </p>

        {/* Table — desktop / tablet */}
        <div className="hidden w-full overflow-hidden rounded-xl border bg-white md:block">
          <div className="w-full overflow-x-auto">
            <Table className="min-w-180">
              <TableHeader className="bg-gray-50/80">
                <TableRow>
                  <TableHead className="w-28 whitespace-nowrap">ID</TableHead>
                  <TableHead>Employee</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Godown</TableHead>
                  <TableHead>Branch address</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((d) => {
                  const accent = roleAccent(d.role);
                  return (
                    <TableRow
                      key={d.id}
                      className="transition-colors hover:bg-gray-50/60"
                    >
                      <TableCell className="font-mono text-xs text-gray-500">
                        {d.employeeId ?? "—"}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar
                            name={d.name}
                            accentBg={accent.bg}
                            accentText={accent.text}
                          />
                          <div className="min-w-0">
                            <div className="truncate font-medium text-gray-900">
                              {d.name}
                            </div>
                            <div className="truncate text-xs text-gray-500">
                              {d.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium capitalize ${accent.bg} ${accent.text}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${accent.dot}`}
                          />
                          {d.role ?? "—"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-900">
                          {d.godown?.name ?? "—"}
                        </div>
                        {d.godown?.code && (
                          <div className="font-mono text-xs text-gray-400">
                            {d.godown.code}
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="max-w-56 truncate text-gray-600">
                        {d.officeAddress ?? "—"}
                      </TableCell>
                      <TableCell className="text-right">
                        <StatusPill banned={d.banned} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            {filteredData.length === 0 && <EmptyState query={searchQuery} />}
          </div>
        </div>

        {/* Card list — mobile */}
        <div className="space-y-2 md:hidden">
          {filteredData.map((d) => {
            const accent = roleAccent(d.role);
            return (
              <div key={d.id} className="rounded-xl border bg-white p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Avatar
                      name={d.name}
                      accentBg={accent.bg}
                      accentText={accent.text}
                    />
                    <div className="min-w-0">
                      <div className="font-medium text-gray-900">{d.name}</div>
                      <div className="truncate text-xs text-gray-500">
                        {d.email}
                      </div>
                    </div>
                  </div>
                  <StatusPill banned={d.banned} />
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs">
                  <span className="font-mono text-gray-400">
                    {d.employeeId ?? "—"}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 font-medium capitalize ${accent.bg} ${accent.text}`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${accent.dot}`}
                    />
                    {d.role ?? "—"}
                  </span>
                  {d.godown?.name && (
                    <span className="inline-flex items-center gap-1 text-gray-500">
                      <MapPin className="h-3 w-3" />
                      {d.godown.name}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
          {filteredData.length === 0 && <EmptyState query={searchQuery} />}
        </div>
      </div>
    </div>
  );
};

function EmptyState({ query }: { query: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border bg-white py-12 text-center md:border-0">
      <p className="text-sm font-medium text-gray-900">No employees found</p>
      <p className="text-sm text-gray-500">
        {query ? (
          <>We couldn&apos;t find anything matching &quot;{query}&quot;.</>
        ) : (
          "No employees match the current filters."
        )}
      </p>
    </div>
  );
}

export default EmployeeList;
