import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShieldCheck, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface LocationStackCardProps {
  stackNumber: string;
  isFumigated: boolean;
  currentWeightKg: string;
  maxCapacityKg: number;
  commodityName: string;
  lastUpdated: Date;
}

const LocationStackCard = ({
  stackNumber,
  isFumigated,
  currentWeightKg,
  maxCapacityKg,
  commodityName,
  lastUpdated,
}: LocationStackCardProps) => {
  const stackPercent = Math.min(
    100,
    Math.round((parseFloat(currentWeightKg) / maxCapacityKg) * 100),
  );
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardDescription className="text-xs font-semibold uppercase tracking-wider">
              Location Stack
            </CardDescription>
            <CardTitle className="text-lg mt-0.5">{stackNumber}</CardTitle>
          </div>
          <Badge
            variant={isFumigated ? "default" : "outline"}
            className={
              isFumigated
                ? "bg-emerald-600 hover:bg-emerald-700 text-white gap-1"
                : "gap-1 text-amber-600 border-amber-300 dark:border-amber-700"
            }
          >
            {isFumigated ? (
              <ShieldCheck className="w-3.5 h-3.5" />
            ) : (
              <ShieldAlert className="w-3.5 h-3.5" />
            )}
            {isFumigated ? "Fumigated" : "Pending Fumigation"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground font-medium">
            <span>Capacity Load</span>
            <span>
              {currentWeightKg} / {maxCapacityKg} KG ({stackPercent}%)
            </span>
          </div>
          <Progress value={stackPercent} />
        </div>

        <div className="pt-2 border-t text-xs text-muted-foreground flex justify-between">
          <span>
            Commodity:{" "}
            <strong className="text-foreground">{commodityName}</strong>
          </span>
          <span>Updated: {new Date(lastUpdated).toLocaleDateString()}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationStackCard;
