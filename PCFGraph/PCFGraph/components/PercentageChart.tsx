import * as React from "react";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";
import { ChartData } from "../ChartTypes";

interface Props {
  title?: string;
  data: ChartData[];
}

const COLORS = ["#0078d4", "#107c10", "#d13438", "#ff8c00", "#5c2d91"];

export const PercentageChart: React.FC<Props> = ({ title, data }) => {
  if (!data.length) {
    return <div>No data available</div>;
  }

  return (
    <div>
      {title ? <h3>{title}</h3> : null}
      <PieChart width={420} height={320}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={110}
          label={(entry) => `${entry.name}: ${entry.value}%`}
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};
