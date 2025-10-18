"use client";

export default function WorkingCapitalChartSkeleton() {
  return (
    <div className="bg-white md:px-[25px] py-2 md:py-[15px] border border-[#F5F5F5] rounded-[10px] animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-wrap justify-between items-center mb-5 px-[15px]">
        {/* Title */}
        <div className="bg-gray-200 rounded w-40 h-5"></div>

        {/* Right Section */}
        <div className="flex justify-between md:w-[50%] max-w-[340px]">
          {/* Legend */}
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="bg-[#29A073] rounded-full w-2 h-2"></div>
              <div className="bg-gray-200 rounded w-16 h-4"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-[#C8EE44] rounded-full w-2 h-2"></div>
              <div className="bg-gray-200 rounded w-16 h-4"></div>
            </div>
          </div>

          {/* Dropdown */}
          <div className="relative">
            <div className="bg-[#F8F8F8] rounded-[5px] w-28 h-7"></div>
            {/* Arrow is hidden in skeleton — optional to include as static SVG, but usually omitted */}
          </div>
        </div>
      </div>

      {/* Chart Area Skeleton */}
      <div className="bg-gray-50 rounded h-72">
        {/* Optional: Simulate grid lines with subtle lines (not required for skeleton) */}
        {/* We'll just use a solid placeholder */}
      </div>
    </div>
  );
}