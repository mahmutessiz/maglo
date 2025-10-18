"use client";
import { ChevronRight } from "lucide-react";
import type { ScheduledTransfersData } from "../../../types/types";
import ScheduledTransfersSkeleton from "./skeletons/ScheduledTransfersSkeleton";
export default function ScheduledTransfers({ data, isLoading }: { data?: ScheduledTransfersData, isLoading?: boolean }) {

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

if(isLoading){
  return <ScheduledTransfersSkeleton />
}

  return (
    <div className="w-full max-w-md">
      <div className="flex justify-between items-center mb-6 px-4">
        <h2 className="font-semibold text-gray-900 text-xl">Scheduled Transfers</h2>
        <button className="flex items-center gap-1 font-semibold text-[#29A073] hover:text-teal-700 text-sm">
          View All <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-0">
        {data && data.transfers.length > 0 ? (
          data.transfers.map((transfer) => (
            <div
              key={transfer.id}
              className={`flex items-center justify-between py-4 px-4 border-b border-b-[#FAFAFA]`}
            >
              <div className="flex flex-1 items-center gap-3">
                <img
                  src={transfer.image}
                  alt={transfer.name}
                  className="rounded-full w-10 h-10"
                />
                <div className="flex flex-col flex-1 gap-[7px]">
                  <p className="font-semibold text-[#1B212D] text-sm">{transfer.name}</p>
                  <p className="text-[#929EAE] text-xs">{formatDate(transfer.date)}</p>
                </div>
              </div>
              <p className="font-semibold text-[16px] text-black">
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