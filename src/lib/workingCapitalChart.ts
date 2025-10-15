// lib/workingCapitalChart.ts
import type { WorkingCapital } from "../types/types";

export interface WorkingCapitalChartItem {
  name: string; // Month name (e.g., "Ocak", or formatted as needed)
  income: number;
  expenses: number;
  net: number;
}

export function toRechartsData(wc?: WorkingCapital): WorkingCapitalChartItem[] {
  if (!wc) return [];
  return wc.data.map((item) => ({
    name: item.month, // Using month name from the API response
    income: item.income,
    expenses: item.expense,
    net: item.net,
  }));
}
