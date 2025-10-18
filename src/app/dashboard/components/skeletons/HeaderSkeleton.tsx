"use client";

export default function HeaderDesktopSkeleton() {
  return (
    <header className="flex justify-between items-center bg-white shadow-sm md:shadow-none md:ml-[calc(16rem)] px-8 pt-[30px] w-auto animate-pulse">
      {/* Title Skeleton */}
      <div className="bg-gray-200 rounded w-32 h-7"></div>

      {/* Right Section */}
      <div className="flex items-center gap-[45px]">
        {/* Search Icon */}
        <div className="bg-gray-200 rounded w-6 h-6"></div>

        {/* Notification Icon */}
        <div className="bg-gray-200 rounded w-6 h-6"></div>

        {/* User Info Skeleton */}
        <div className="flex items-center bg-[#FAFAFA] px-3 py-1.5 rounded-full">
          <div className="bg-gray-200 rounded-full w-9 h-9"></div>
          <div className="flex flex-col ml-2">
            <div className="bg-gray-200 rounded w-20 h-5"></div>
          </div>
        </div>
      </div>
    </header>
  );
}