"use client";

export default function SidebarSkeleton({ isMobile = false }: { isMobile?: boolean }) {
  return (
    <aside
      className={`flex flex-col flex-shrink-0 bg-[#FAFAFA] w-64 h-screen transition-transform duration-300 ${
        isMobile ? "shadow-lg" : "hidden md:flex md:sticky md:top-0"
      }`}
    >
      {/* Logo Section Skeleton */}
      <div className="flex items-center gap-2 mb-8 px-8 pt-[30px] h-20">
        <div className="bg-gray-200 rounded w-[30px] h-[30px] animate-pulse" />
        <div className="bg-gray-200 rounded w-24 h-6 animate-pulse" />
      </div>

      {/* Navigation Items Skeleton */}
      <nav className="flex-1 space-y-2 px-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 bg-gray-200 px-[15px] py-[14px] rounded-lg w-full animate-pulse"
          >
            <div className="bg-gray-300 rounded w-5 h-5" />
            <div className="bg-gray-300 rounded w-20 h-4" />
          </div>
        ))}
      </nav>

      {/* Bottom Section Skeleton */}
      <div className="space-y-2 mb-6 px-6">
        {/* Help Link */}
        <div className="flex items-center gap-3 bg-gray-200 px-4 py-3 rounded-lg animate-pulse">
          <div className="bg-gray-300 rounded w-5 h-5" />
          <div className="bg-gray-300 rounded w-12 h-4" />
        </div>

        {/* Logout Button */}
        <div className="flex items-center gap-3 bg-gray-200 px-4 py-3 rounded-lg animate-pulse">
          <div className="bg-gray-300 rounded w-5 h-5" />
          <div className="bg-gray-300 rounded w-20 h-4" />
        </div>
      </div>
    </aside>
  );
}