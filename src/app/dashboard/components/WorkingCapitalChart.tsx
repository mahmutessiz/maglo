"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  TooltipProps,
} from "recharts";
import {
  toRechartsData,
  type WorkingCapitalChartItem,
} from "../../../lib/workingCapitalChart";
import type { WorkingCapital } from "../../../types/types";

// Custom tooltip to include net value
interface ChartTooltipProps extends TooltipProps<number, string> {
  active?: boolean;
  payload?: { value: number; payload: WorkingCapitalChartItem }[];
  label?: string;
}
const CustomTooltip = ({ active, payload, label }: ChartTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as WorkingCapitalChartItem;

    return (
      <div className="bg-white shadow-lg p-4 border border-gray-200 rounded-lg">
        <p className="font-bold text-gray-800 text-sm">{label}</p>
        <p className="text-gray-500 text-xs">
          Income: {data.income.toLocaleString()}
        </p>
        <p className="text-gray-500 text-xs">
          Expenses: {data.expenses.toLocaleString()}
        </p>
        <p
          className={`font-semibold text-xs ${
            data.net >= 0 ? "text-teal-600" : "text-red-600"
          }`}
        >
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

  const formatLargeNumber = (number: number) => {
    if (number >= 1000000000) {
      return (number / 1000000000).toFixed(1) + "B";
    }
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + "M";
    }
    if (number >= 1000) {
      return number / 1000 + "K";
    }
    return number;
  };

  const formatTick = (value: number) => {
    const formattedValue = formatLargeNumber(value);
    return `${formattedValue}`;
  };

  // formatMonthName turkish
  const getTurkishMonthAbbreviation = (value: string): string => {
    const turkishMonthAbbreviations: {
      [key: string]: string;
      Ocak: string;
      Şubat: string;
      Mart: string;
      Nisan: string;
      Mayıs: string;
      Haziran: string;
      Temmuz: string;
      Ağustos: string;
      Eylül: string;
      Ekim: string;
      Kasım: string;
      Aralık: string;
    } = {
      Ocak: "Oca",
      Şubat: "Şub",
      Mart: "Mar",
      Nisan: "Nis",
      Mayıs: "May",
      Haziran: "Haz",
      Temmuz: "Tem",
      Ağustos: "Ağu",
      Eylül: "Eyl",
      Ekim: "Eki",
      Kasım: "Kas",
      Aralık: "Ara",
    };

    const normalizedValue =
      value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

    return turkishMonthAbbreviations[normalizedValue] || value;
  };

  return (
    <div className="bg-white md:px-[25px] py-2 md:py-[15px] border border-[#F5F5F5] rounded-[10px]">
      <div className="flex flex-wrap justify-between items-center mb-5 px-[15px]">
        <h2 className="font-semibold text-[#1B212D] text-lg">Working Capital</h2>
        <div className="flex justify-between md:w-[50%] max-w-[340px]">
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <span className="bg-[#29A073] rounded-full w-2 h-2 font-normal text-[#1B212D] text-[12px]"></span>
              <p>income</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-[#C8EE44] rounded-full w-2 h-2 font-normal text-[#1B212D] text-[12px]"></span>
              <p>expenses</p>
            </div>
          </div>
          <div className="inline-block relative">
            <select
              className="bg-[#F8F8F8] py-[6px] pr-[10px] pl-[8px] rounded-[5px] focus:outline-none focus:ring-2 focus:ring-gray-200 w-28 font-medium text-[#1B212D] text-[12px] appearance-none cursor-pointer"
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 25,
              right: 0,
              left: -15,
              bottom: 0,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 0"
              stroke="#FFF4FE"
              horizontal={false}
            />
            <XAxis
              dataKey="name"
              tick={{ fill: "#929EAE",fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={getTurkishMonthAbbreviation}
              dy={8}
            />
            <YAxis
              tick={{ fill: "#929EAE",fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={formatTick}
              dy={-12}
            />
            <Tooltip content={<CustomTooltip />} />
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
