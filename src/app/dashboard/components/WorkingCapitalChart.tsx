"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
  CartesianGrid,
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
    <div className="bg-white p-6 border border-[#F5F5F5] rounded-[10px]">
      <div className="flex flex-wrap justify-between items-center mb-5 px-[15px]">
        <h2 className="font-bold text-gray-800 text-xl">Working Capital</h2>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <span className="bg-teal-500 rounded-full w-2 h-2"></span>
          <p>income</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-yellow-500 rounded-full w-2 h-2"></span>
          <p>expenses</p>
          </div>
        </div>
        <div className="inline-block relative">
  <select
    className="bg-gray-50 px-3 py-1.5 pr-8 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 font-medium text-gray-700 text-sm appearance-none cursor-pointer"
    defaultValue="Last 7 days"
  >
    <option>Last 7 days</option>
    <option>Last 30 days</option>
    <option>Last 6 months</option>
    <option>Last year</option>
  </select>

  {/* Dropdown arrow */}
  <svg
    className="top-1/2 right-2 absolute w-4 h-4 text-gray-500 -translate-y-1/2 pointer-events-none"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
</div>
      </div>

      <div className="h-72">
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
            <CartesianGrid strokeDasharray="3 0" stroke="#FFF4FE" horizontal={false} />
            <XAxis
              dataKey="name"
              tick={{ fill: "#9CA3AF" }}
              axisLine={false}
              tickLine={false}
              dy={8}
            />
            <YAxis
              tick={{ fill: "#9CA3AF" }}
              axisLine={false}
              tickLine={false}
              dy={-12}
            />
            <Tooltip content={<CustomTooltip />} />
            {/* <Legend verticalAlign="top" height={36} /> */}
            <Line
              type="monotone"
              dataKey="income"
              name="Income"
              stroke="#29A073"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: "#10B981" }}
            />
            <Line
              type="monotone"
              dataKey="expenses"
              name="Expenses"
              stroke="#C8EE44"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: "#EAB308" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
