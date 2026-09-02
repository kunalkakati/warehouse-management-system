import React from "react";
import { GodownAndLocationType } from "@/lib/actions/godown-action";

const GodownInsight = ({ data }: { data: GodownAndLocationType }) => {
  return (
    <div>
      <div>
        <p>Total Capacity: {data[0].godown.totalCapacityMt} MT</p>
      </div>
      <h2>{}</h2>
    </div>
  );
};

export default GodownInsight;
