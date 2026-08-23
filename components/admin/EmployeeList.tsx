"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Employee } from "@/types/type";

const EmployeeList = ({ data }: { data: Employee[] }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter logic: checks multiple fields for a match
  const filteredData = data.filter((employee) => {
    const query = searchQuery.toLowerCase();
    return (
      employee.name.toLowerCase().includes(query) ||
      employee.email.toLowerCase().includes(query) ||
      employee.officeAddress?.toLowerCase().includes(query) ||
      employee.employeeId?.toLowerCase().includes(query) ||
      employee.role?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative max-w-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search by name, ID, role, or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-full rounded-lg border border-gray-200 py-2 pl-10 pr-3 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Table Container */}
      <div className="w-full overflow-hidden rounded-xl border bg-white shadow-sm">
        <div className="w-full overflow-x-auto">
          <Table className="min-w-200">
            <TableHeader className="bg-gray-50/80">
              <TableRow>
                <TableHead className="w-24 whitespace-nowrap">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Branch Address</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((d) => (
                <TableRow
                  key={d.id}
                  className="transition-colors hover:bg-gray-50/50"
                >
                  <TableCell className="font-medium text-gray-900">
                    {d.employeeId}
                  </TableCell>
                  <TableCell className="font-medium">{d.name}</TableCell>
                  <TableCell className="text-gray-500">{d.email}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center  text-xs font-medium text-slate-800">
                      {d.role?.toLocaleUpperCase()}
                    </span>
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {d.officeAddress}
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium text-green-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                      Active
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Empty State when search yields no results */}
          {filteredData.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-sm font-medium text-gray-900">
                No employees found
              </p>
              <p className="text-sm text-gray-500">
                We couldn&apos;t find anything matching &quot;{searchQuery}
                &quot;.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
