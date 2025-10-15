"use client";
import { ArrowDownCircle, ArrowUpCircle, MoreHorizontal } from "lucide-react";
import type { TransactionsData } from "../../../types/types";

export default function RecentTransactions({ data }: { data?: TransactionsData }) {
  return (
    <div className="bg-white shadow-sm p-6 border border-gray-200 rounded-2xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-gray-800 text-xl">Recent Transactions</h2>
        <button className="text-gray-500 hover:text-gray-800">
          <MoreHorizontal />
        </button>
      </div>

      <div className="space-y-4">
        {data && data.transactions.length > 0 ? (
          data.transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex justify-between items-center pb-3 border-gray-100 last:border-0 border-b"
            >
              <div className="flex items-center space-x-3">
                {tx.type === "income" ? (
                  <ArrowDownCircle className="w-6 h-6 text-green-500" />
                ) : (
                  <ArrowUpCircle className="w-6 h-6 text-red-500" />
                )}
                <div>
                  <p className="font-semibold text-gray-800">{tx.title}</p>
                  <p className="text-gray-500 text-sm">{tx.date}</p>
                </div>
              </div>
              <p
                className={`font-semibold ${
                  tx.type === "income" ? "text-green-600" : "text-red-600"
                }`}
              >
                {tx.type === "income" ? "+" : "-"}${tx.amount.toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No recent transactions.</p>
        )}
      </div>
    </div>
  );
}
