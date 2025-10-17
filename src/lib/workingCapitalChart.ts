import type { WorkingCapital } from "../types/types";

export interface WorkingCapitalChartItem {
  name: string;
  income: number;
  expenses: number;
  net: number;
}

export function toRechartsData(wc?: WorkingCapital): WorkingCapitalChartItem[] {
  if (!wc) return [];
  return wc.data.map((item) => ({
    name: item.month,
    income: item.income,
    expenses: item.expense,
    net: item.net,
  }));
}
