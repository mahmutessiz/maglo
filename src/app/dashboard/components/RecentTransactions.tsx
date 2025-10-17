"use client";
import { ChevronRight } from "lucide-react";
import type { TransactionsData } from "../../../types/types";
import Image from "next/image";
export default function RecentTransactions({ data }: { data?: TransactionsData }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" });
  };

  return (
    <div className="py-4 border border-[#F5F5F5] rounded-[10px] w-full max-w-6xl">
      <div className="flex justify-between items-center mb-6 px-4">
        <h2 className="font-semibold text-gray-900 text-lg">Recent Transaction</h2>
        <button className="flex items-center gap-1 font-semibold text-[#29A073] hover:text-teal-700 text-sm">
          View All <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="bg-white rounded-lg overflow-hidden text-[#929EAE]">
        {/* Header Row */}
        <div className="gap-4 grid grid-cols-12 px-6 py-4">
          <div className="col-span-4">
            <p className="font-semibold text-xs uppercase tracking-wide">Name/Business</p>
          </div>
          <div className="col-span-3">
            <p className="font-semibold text-xs uppercase tracking-wide">Type</p>
          </div>
          <div className="col-span-2">
            <p className="font-semibold text-xs uppercase tracking-wide">Amount</p>
          </div>
          <div className="col-span-3">
            <p className="font-semibold text-xs uppercase tracking-wide">Date</p>
          </div>
        </div>

        {/* Transaction Rows */}
        {data && data.transactions.length > 0 ? (
          data.transactions.map((tx) => (
            <div
              key={tx.id}
              className="items-center gap-4 grid grid-cols-12 hover:bg-gray-50 px-6 py-4 border-gray-100 last:border-0 border-b transition-colors"
            >
              <div className="flex items-center gap-3 col-span-4">
                <Image
                  src={tx.image}
                  alt={tx.business}
                  width={32}
                  height={30}
                  className="rounded-md w-8 h-[30px] object-center object-contain"
                />
                <div>
                  <p className="font-medium text-gray-900 text-sm">{tx.name}</p>
                  <p className="text-gray-500 text-xs">{tx.business}</p>
                </div>
              </div>
              <div className="col-span-3">
                <p className="text-[#929EAE] text-sm">{tx.type}</p>
              </div>
              <div className="col-span-2">
                <p className={`font-semibold text-sm ${tx.amount < 0 ? "text-[#1B212D]" : "text-green-600"}`}>
                  {tx.amount < 0 ? "−" : "+"}{tx.currency == 'TRY' ? '₺' : '$'}{Math.abs(tx.amount).toLocaleString()}
                </p>
              </div>
              <div className="col-span-3">
                <p className="text-sm">{formatDate(tx.date)}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="px-6 py-8 text-center">
            <p className="text-gray-500 text-sm">No recent transactions.</p>
          </div>
        )}
      </div>
    </div>
  );
}