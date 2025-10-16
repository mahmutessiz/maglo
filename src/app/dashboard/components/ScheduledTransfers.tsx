"use client";
import { ChevronRight } from "lucide-react";
import type { ScheduledTransfersData } from "../../../types/types";

export default function ScheduledTransfers({ data }: { data?: ScheduledTransfersData }) {

  const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const dateFormatted = date.toLocaleDateString("en-US", { 
    year: "numeric", 
    month: "long", 
    day: "numeric" 
  });
  const timeFormatted = date.toLocaleTimeString("en-US", { 
    hour: "2-digit", 
    minute: "2-digit",
    hour12: false
  });
  return `${dateFormatted} at ${timeFormatted}`;
};

  return (
    <div className="w-full max-w-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-semibold text-gray-900 text-xl">Scheduled Transfers</h2>
        <button className="flex items-center gap-1 font-semibold text-[#29A073] hover:text-teal-700 text-sm">
          View All <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-0">
        {data && data.transfers.length > 0 ? (
          data.transfers.map((transfer, index) => (
            <div
              key={transfer.id}
              className={`flex items-center justify-between py-4 px-4 ${
                index !== data.transfers.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              <div className="flex flex-1 items-center gap-3">
                <img
                  src={transfer.image}
                  alt={transfer.name}
                  className="rounded-full w-10 h-10"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">{transfer.name}</p>
                  <p className="text-gray-500 text-xs">{formatDate(transfer.date)}</p>
                </div>
              </div>
              <p className="font-semibold text-gray-900 text-sm">
                − {transfer.currency}{Math.abs(transfer.amount).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="py-4 text-gray-500 text-sm">No scheduled transfers.</p>
        )}
      </div>
    </div>
  );
}