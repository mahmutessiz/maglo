"use client";
import { Clock, MoreHorizontal } from "lucide-react";
import type { ScheduledTransfersData } from "../../../types/types";

export default function ScheduledTransfers({ data }: { data?: ScheduledTransfersData }) {
  return (
    <div className="bg-white shadow-sm p-6 border border-gray-200 rounded-2xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-gray-800 text-xl">Scheduled Transfers</h2>
        <button className="text-gray-500 hover:text-gray-800">
          <MoreHorizontal />
        </button>
      </div>

      <div className="space-y-4">
        {data && data.transfers.length > 0 ? (
          data.transfers.map((transfer) => (
            <div
              key={transfer.id}
              className="flex justify-between items-center pb-3 border-gray-100 last:border-0 border-b"
            >
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-semibold text-gray-800">
                    {transfer.recipient}
                  </p>
                  <p className="text-gray-500 text-sm">{transfer.date}</p>
                </div>
              </div>
              <p className="font-semibold text-gray-900">
                ${transfer.amount.toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No scheduled transfers.</p>
        )}
      </div>
    </div>
  );
}
