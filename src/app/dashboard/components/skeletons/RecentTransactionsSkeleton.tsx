"use client";

export default function RecentTransactionsDesktopSkeleton() {
  return (
    <div className="py-4 border border-[#F5F5F5] rounded-[10px] w-full max-w-6xl animate-pulse">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 px-4">
        <div className="bg-gray-200 rounded w-48 h-5"></div>
        <div className="bg-gray-200 rounded w-20 h-5"></div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-lg overflow-hidden">
        {/* Header Row */}
        <div className="gap-4 grid grid-cols-12 px-6 py-4">
          <div className="col-span-4 bg-gray-200 rounded w-24 h-4"></div>
          <div className="col-span-3 bg-gray-200 rounded w-16 h-4"></div>
          <div className="col-span-2 bg-gray-200 rounded w-16 h-4"></div>
          <div className="col-span-3 bg-gray-200 rounded w-20 h-4"></div>
        </div>

        {/* Skeleton Rows (e.g., 4 items) */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="items-center gap-4 grid grid-cols-12 px-6 py-4 border-gray-100 last:border-0 border-b"
          >
            {/* Name/Business */}
            <div className="flex items-center gap-3 col-span-4">
              <div className="bg-gray-200 rounded-md w-8 h-[30px]"></div>
              <div className="space-y-2">
                <div className="bg-gray-200 rounded w-28 h-4"></div>
                <div className="bg-gray-200 rounded w-20 h-3"></div>
              </div>
            </div>

            {/* Type */}
            <div className="col-span-3">
              <div className="bg-gray-200 rounded w-16 h-4"></div>
            </div>

            {/* Amount */}
            <div className="col-span-2">
              <div className="bg-gray-200 rounded w-14 h-4"></div>
            </div>

            {/* Date */}
            <div className="col-span-3">
              <div className="bg-gray-200 rounded w-20 h-4"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}