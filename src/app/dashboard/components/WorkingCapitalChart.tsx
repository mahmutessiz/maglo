"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  TooltipProps,
} from "recharts";
import { toRechartsData, type WorkingCapitalChartItem } from "../../../lib/workingCapitalChart";
import type { WorkingCapital } from "../../../types/types";

// Custom tooltip to include net value
const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as WorkingCapitalChartItem;
    
    return (
      <div className="bg-white shadow-lg p-4 border border-gray-200 rounded-lg">
        <p className="font-bold text-gray-800">{label}</p>
        <p className="text-gray-500">Income: {data.income.toLocaleString()}</p>
        <p className="text-gray-500">Expenses: {data.expenses.toLocaleString()}</p>
        <p className={`font-semibold ${data.net >= 0 ? 'text-teal-600' : 'text-red-600'}`}>
          Net: {data.net.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export default function WorkingCapitalChart({
  data,
}: {
  data?: WorkingCapital;
}) {
  const chartData = toRechartsData(data) || [];

  return (
    <div className="bg-white shadow-sm p-6 border border-gray-200 rounded-2xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-gray-800 text-xl">Working Capital</h2>
        <select className="bg-gray-50 px-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none text-gray-500 text-sm">
          <option>Last 6 months</option>
        </select>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 10,
              bottom: 0,
            }}
          >
            {/* <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" /> */}
            <XAxis
              dataKey="name"
              tick={{ fill: "#9CA3AF" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#9CA3AF" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" height={36} />
            <Line
              type="monotone"
              dataKey="income"
              name="Income"
              stroke="#10B981"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, fill: "#10B981" }}
            />
            <Line
              type="monotone"
              dataKey="expenses"
              name="Expenses"
              stroke="#EAB308"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, fill: "#EAB308" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
