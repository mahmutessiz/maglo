"use client";

export default function CreditCardSkeleton() {
  return (
    <>
      {/* Primary Card Skeleton */}
      <div
        className="px-[30px] py-4 rounded-[15px] w-full max-w-[354px] h-[210px] animate-pulse"
        style={{
          background: "linear-gradient(104.3deg, #4A4A49 2.66%, #20201F 90.57%)",
        }}
      >
        <div className="flex flex-col justify-between gap-4">
          {/* Top Section */}
          <div className="flex items-center gap-1">
            <div className="bg-gray-400 rounded w-16 h-4"></div>
            <div className="bg-gray-600 rounded w-1 h-4"></div>
            <div className="bg-gray-600 rounded w-20 h-3"></div>
          </div>

          {/* Middle Section */}
          <div className="flex justify-between">
            <div className="bg-gray-500 rounded w-[38px] h-[30px]"></div>
            <div className="bg-gray-500 rounded w-[33px] h-[34px]"></div>
          </div>

          {/* Card Number */}
          <div className="bg-gray-300 rounded w-32 h-5"></div>

          {/* Expiry & Logo */}
          <div className="flex justify-between items-center py-2">
            <div className="bg-gray-600 rounded w-10 h-4"></div>
            <div className="bg-gray-500 rounded w-[38px] h-[30px]"></div>
          </div>
        </div>
      </div>

      {/* Secondary Card Skeleton */}
      <div
        className="bg-gradient-to-b from-gray-200/40 to-gray-300/10 backdrop-blur-sm -mt-16 px-[30px] py-4 rounded-[15px] w-[90%] max-w-[324px] h-[172px] animate-pulse"
      >
        <div className="flex flex-col gap-2">
          {/* Top Section */}
          <div className="flex items-center gap-1">
            <div className="bg-white/80 rounded w-16 h-4"></div>
            <div className="bg-white/60 rounded w-1 h-4"></div>
            <div className="bg-white/60 rounded w-20 h-3"></div>
          </div>

          {/* Middle Section */}
          <div className="flex justify-between">
            <div className="bg-white/50 rounded w-[38px] h-[30px]"></div>
            <div className="bg-white/50 rounded w-[33px] h-[34px]"></div>
          </div>

          {/* Card Number */}
          <div className="bg-white/70 rounded w-32 h-5"></div>

          {/* Expiry & Logo */}
          <div className="flex justify-between items-center py-2">
            <div className="bg-white/60 rounded w-10 h-4"></div>
            <div className="bg-white/50 rounded w-[38px] h-[30px]"></div>
          </div>
        </div>
      </div>
    </>
  );
}