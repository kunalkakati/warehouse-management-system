"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";
import { employeeSearchSchema } from "@/lib/zod/zod.user";
import { toast } from "sonner";
import { GetEmployeeInfo, TransferEmployee } from "@/lib/actions/user-action";
import { Employee } from "@/types/type";
import {
  Search,
  Loader2,
  ArrowRightLeft,
  CheckCircle2,
  Mail,
  Building2,
} from "lucide-react";

const BRANCHES = [
  { value: "guwahati", label: "Guwahati" },
  { value: "agartala", label: "Agartala" },
  { value: "imphal", label: "Imphal" },
  { value: "nalbari", label: "Nalbari" },
  { value: "tura", label: "Tura" },
  { value: "shillong", label: "Shillong" },
];

const Transfer = () => {
  const [eid, setEid] = useState("");
  const [newBranch, setNewBranch] = useState<string | null>(null);
  const [employee, setEmployee] = useState<Employee>();
  const [isSearching, setIsSearching] = useState(false);
  const [isTransferring, setIsTransferring] = useState(false);
  const [isDataAvailable, setIsDataAvailable] = useState(false);
  const [initiateTransfer, setInitiateTransfer] = useState(false);
  const [newEmployeeData, setNewEmployeeData] = useState<Employee>();

  const handleSearchEmployee = async () => {
    setIsSearching(true);
    setIsDataAvailable(false);
    setNewEmployeeData(undefined);
    setInitiateTransfer(false);
    setNewBranch(null);

    const validate = employeeSearchSchema.safeParse({ eid });

    if (!validate.success) {
      toast.error(`Check employee ID: ${validate.error.issues[0].message}`);
      setIsSearching(false);
      return;
    }

    try {
      const employeeData = await GetEmployeeInfo(validate.data.eid);
      if (!employeeData?.[0]) {
        toast.error("No employee found with that ID");
        setIsSearching(false);
        return;
      }
      setEmployee(employeeData[0]);
      setIsDataAvailable(true);
    } catch (error) {
      toast.error(`Something went wrong: ${error}`);
    } finally {
      setIsSearching(false);
    }
  };

  const handleTransfer = async (
    id: string | undefined,
    branch: string | null,
  ) => {
    setIsTransferring(true);
    try {
      const uid = id || "";
      const updatedBranch = await TransferEmployee(uid, branch);
      setNewEmployeeData(updatedBranch[0]);
      setInitiateTransfer(false);
      toast.success("Employee transferred successfully");
    } catch (error) {
      toast.error(`Transfer failed: ${error}`);
    } finally {
      setIsTransferring(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-xl space-y-4 p-4 sm:p-6">
      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Transfer employee</CardTitle>
          <CardDescription>
            Look up an employee by ID, then move them to a new branch.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex-1 space-y-1.5">
              <Label htmlFor="eid">Employee ID</Label>
              <Input
                id="eid"
                value={eid}
                onChange={(e) => setEid(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearchEmployee()}
                placeholder="e.g. EMP-1024"
              />
            </div>
            <Button
              onClick={handleSearchEmployee}
              disabled={isSearching || !eid}
              className="sm:mt-6 sm:self-end"
            >
              {isSearching ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Searching
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  Search
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Loading skeleton */}
      {isSearching && (
        <Card>
          <CardContent className="space-y-3 pt-6">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/3" />
          </CardContent>
        </Card>
      )}

      {/* Employee result */}
      {isDataAvailable && employee && !isSearching && (
        <Card>
          <CardHeader className="flex flex-row items-start justify-between gap-4">
            <div>
              <CardTitle>{employee.name}</CardTitle>
              <CardDescription className="mt-1 flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5" />
                {employee.email}
              </CardDescription>
            </div>
            <Badge variant="secondary" className="shrink-0">
              {employee.role}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Building2 className="h-3.5 w-3.5" />
              Currently at {employee.officeAddress}
            </div>
          </CardContent>
          {!initiateTransfer && (
            <CardFooter>
              <Button
                variant="outline"
                onClick={() => setInitiateTransfer(true)}
                className="w-full sm:w-auto"
              >
                <ArrowRightLeft className="h-4 w-4" />
                Initiate transfer
              </Button>
            </CardFooter>
          )}
        </Card>
      )}

      {/* Transfer form */}
      {initiateTransfer && employee && (
        <Card className="border-primary/30">
          <CardHeader>
            <CardTitle className="text-base">Move to a new branch</CardTitle>
            <CardDescription>
              {employee.name} will be reassigned from {employee.officeAddress}.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-1.5">
              <Label>New branch</Label>
              <Select value={newBranch} onValueChange={setNewBranch}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a branch" />
                </SelectTrigger>
                <SelectContent>
                  {BRANCHES.filter(
                    (b) =>
                      b.label.toLowerCase() !==
                      employee.officeAddress?.toLowerCase(),
                  ).map((b) => (
                    <SelectItem key={b.value} value={b.value}>
                      {b.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button
              variant="ghost"
              onClick={() => setInitiateTransfer(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleTransfer(employee.id, newBranch)}
              disabled={newBranch === null || isTransferring}
              className="w-full sm:w-auto"
            >
              {isTransferring ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Transferring
                </>
              ) : (
                <>
                  <ArrowRightLeft className="h-4 w-4" />
                  Confirm transfer
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Success */}
      {newEmployeeData && (
        <Card className="border-green-600/30 bg-green-50/50 dark:bg-green-950/20">
          <CardContent className="flex items-start gap-3 pt-6">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
            <div>
              <p className="font-medium">{newEmployeeData.name} transferred</p>
              <p className="text-sm text-muted-foreground">
                Now assigned to {newEmployeeData.officeAddress}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Transfer;
