"use client";

export default function ScheduledTransfersSkeleton() {
  return (
    <div className="w-full max-w-md animate-pulse">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 px-4">
        <div className="bg-gray-200 rounded w-48 h-6"></div>
        <div className="bg-gray-200 rounded w-20 h-5"></div>
      </div>

      {/* Transfer Items Skeleton */}
      <div className="space-y-0">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="flex justify-between items-center px-4 py-4 border-b border-b-[#FAFAFA]"
          >
            <div className="flex flex-1 items-center gap-3">
              {/* Avatar */}
              <div className="bg-gray-200 rounded-full w-10 h-10"></div>
              {/* Text Content */}
              <div className="flex flex-col flex-1 gap-[7px]">
                <div className="bg-gray-200 rounded w-3/4 h-4"></div>
                <div className="bg-gray-200 rounded w-1/2 h-3"></div>
              </div>
            </div>
            {/* Amount */}
            <div className="bg-gray-200 rounded w-16 h-5"></div>
          </div>
        ))}
      </div>
    </div>
  );
}