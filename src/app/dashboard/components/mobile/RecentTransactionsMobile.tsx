"use client";

import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import type { TransactionsData } from "@/types/types";
import { formatCurrency } from "@/lib/utils";

export default function RecentTransactionsMobile({ data }: { data?: TransactionsData }) {
  const [showAll, setShowAll] = useState(false);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (!data || !data.transactions || data.transactions.length === 0) {
    return (
      <div className="bg-white p-4 border border-[#F5F5F5] rounded-[10px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-gray-900 text-base">Recent Transactions</h2>
        </div>
        <p className="py-6 text-gray-500 text-sm text-center">
          No recent transactions.
        </p>
      </div>
    );
  }

  const visibleTransactions = showAll ? data.transactions : data.transactions.slice(0, 4);
  const hasMore = data.transactions.length > 4;

  return (
    <div className="bg-white p-4 border border-[#F5F5F5] rounded-[10px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-gray-900 text-base">Recent Transactions</h2>
        {hasMore && (
          <button 
            className="flex items-center gap-1 font-semibold text-[#29A073] hover:text-teal-700 text-sm cursor-pointer"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "View Less" : "View All"} <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {visibleTransactions.map((tx) => (
          <div
            key={tx.id}
            className="flex justify-between items-center hover:bg-gray-50 p-3 border border-gray-100 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-3">
              <Image
                src={tx.image}
                alt={tx.business}
                width={36}
                height={36}
                className="rounded-md w-9 h-9 object-contain"
              />
              <div>
                <p className="font-medium text-gray-900 text-sm">{tx.name}</p>
                <p className="text-gray-500 text-xs">{tx.business}</p>
                <p className="text-[#929EAE] text-xs">{formatDate(tx.date)}</p>
              </div>
            </div>
            <p
              className={`font-semibold text-sm ${
                tx.amount < 0 ? "text-[#1B212D]" : "text-green-600"
              }`}
            >
              {formatCurrency(tx.amount, tx.currency)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}