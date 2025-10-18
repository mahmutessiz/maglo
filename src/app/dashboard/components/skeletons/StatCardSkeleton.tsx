"use client";

export default function StatCardSkeleton() {
  return (
    <div className="flex justify-center items-center bg-gray-200 px-[20px] py-[24px] rounded-[10px] w-full animate-pulse">
      {/* Icon Placeholder */}
      <div className="flex justify-center items-center bg-gray-300 mr-[15px] rounded-full w-[42px] h-[42px]">
        <div className="bg-gray-400 rounded-sm w-5 h-5"></div>
      </div>

      {/* Text Content Placeholders */}
      <div className="flex flex-col justify-center items-start gap-2.5 min-w-[125px]">
        <div className="bg-gray-300 rounded w-24 h-4"></div>
        <div className="bg-gray-400 rounded w-20 h-7"></div>
      </div>
    </div>
  );
}