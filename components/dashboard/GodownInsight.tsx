import React from "react";
import { MapPin, User } from "lucide-react";
import { GodownAndLocationType } from "@/lib/actions/godown-action";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import StockStatsBoard from "./StockStatsBoard";
import LocationStackCard from "./LocationStackCard";
import StackInfoTable from "./StackInfoTable";

const GodownInsight = ({ data }: { data: GodownAndLocationType }) => {
  if (!data || data.length === 0) {
    return (
      <Card className="m-6">
        <CardContent className="py-10 text-center text-muted-foreground">
          No godown records found.
        </CardContent>
      </Card>
    );
  }

  const primaryGodown = data[0].godown;

  // Metric Computations
  const totalBags = data.reduce((acc, item) => acc + item.currentBags, 0);
  const totalWeightKg = data.reduce(
    (acc, item) => acc + parseFloat(item.currentWeightKg || "0"),
    0,
  );
  const totalWeightMt = (totalWeightKg / 1000).toFixed(2);
  const totalCapacityMt = parseFloat(primaryGodown.totalCapacityMt || "0");
  return (
    <div className="space-y-6 p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <CardTitle className="text-2xl font-bold tracking-tight">
                {primaryGodown.name}
              </CardTitle>
              <Badge variant="secondary" className="font-mono text-xs">
                {primaryGodown.code}
              </Badge>
            </div>
            <CardDescription className="flex flex-wrap items-center gap-y-1 gap-x-4 pt-1">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                Manager: {primaryGodown.managerName}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                {primaryGodown.address}
              </span>
            </CardDescription>
          </div>
        </CardHeader>
      </Card>

      {/* Metric Cards Grid */}
      <StockStatsBoard
        totalCapacityMt={totalCapacityMt}
        totalBags={totalBags}
        totalWeightKg={totalWeightKg}
        stockLadgerCount={data.length}
        totalWeightMt={totalWeightMt}
      />

      {/* Stack Utilization Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((item) => {
          return (
            <LocationStackCard
              key={item.id}
              stackNumber={item.location.stackNumber}
              isFumigated={item.location.isFumigated}
              currentWeightKg={item.currentWeightKg}
              maxCapacityKg={item.location.maxCapacityKg}
              commodityName={item.commodity.name}
              lastUpdated={item.lastUpdated}
            />
          );
        })}
      </div>

      {/* Inventory Breakdown Table */}
      <StackInfoTable data={data} />
    </div>
  );
};

export default GodownInsight;
