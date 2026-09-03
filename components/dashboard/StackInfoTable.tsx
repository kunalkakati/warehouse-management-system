import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GodownAndLocationType } from "@/lib/actions/godown-action";

const StackInfoTable = ({ data }: { data: GodownAndLocationType }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Stock Inventory Breakdown
        </CardTitle>
        <CardDescription>
          Live view of stored commodities, stack allocations, and depositor
          details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Stack</TableHead>
              <TableHead>Commodity</TableHead>
              <TableHead>Depositor</TableHead>
              <TableHead className="text-right">Bags</TableHead>
              <TableHead className="text-right">Weight (KG)</TableHead>
              <TableHead>Contact Person</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  {item.location.stackNumber}
                </TableCell>
                <TableCell>
                  <div className="font-medium text-foreground">
                    {item.commodity.name}
                  </div>
                  <Badge
                    variant="secondary"
                    className="text-[10px] px-1.5 py-0 mt-0.5"
                  >
                    {item.commodity.category}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{item.depositor.name}</div>
                  <div className="text-xs text-muted-foreground">
                    GST: {item.depositor.gstin}
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {item.currentBags}
                </TableCell>
                <TableCell className="text-right font-medium">
                  {item.currentWeightKg}
                </TableCell>
                <TableCell>
                  <div>{item.depositor.contactPerson}</div>
                  <div className="text-xs text-muted-foreground">
                    {item.depositor.phone}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default StackInfoTable;
