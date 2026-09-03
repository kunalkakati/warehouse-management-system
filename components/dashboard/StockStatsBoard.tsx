import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Warehouse, Boxes, Weight, Layers } from "lucide-react";

interface PropsType {
  totalCapacityMt: number;
  totalWeightMt: string;
  totalWeightKg: number;
  totalBags: number;
  stockLadgerCount: number;
}

const StockStatsBoard = ({
  totalCapacityMt,
  totalWeightMt,
  totalWeightKg,
  totalBags,
  stockLadgerCount,
}: PropsType) => {
  const capacityUsedPercent = totalCapacityMt
    ? ((parseFloat(totalWeightMt) / totalCapacityMt) * 100).toFixed(2)
    : "0";
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Capacity</CardTitle>
          <Warehouse className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalCapacityMt} MT</div>
          <p className="text-xs text-muted-foreground mt-1">
            {capacityUsedPercent}% currently utilized
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Current Stock Weight
          </CardTitle>
          <Weight className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalWeightMt} MT</div>
          <p className="text-xs text-muted-foreground mt-1">
            {totalWeightKg.toLocaleString()} KG total
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Bags</CardTitle>
          <Boxes className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalBags.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Across {stockLadgerCount} active stacks
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Stacks</CardTitle>
          <Layers className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stockLadgerCount}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Allocated floor locations
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StockStatsBoard;
