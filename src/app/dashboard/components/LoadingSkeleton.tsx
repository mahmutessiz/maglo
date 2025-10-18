export default function LoadingSkeleton() {
  return (
    <div className="flex bg-white min-h-screen text-gray-800">
      {/* Sidebar Skeleton */}
      <div className="hidden md:flex flex-col gap-8 bg-gray-50 p-6 border-gray-200 border-r w-64">
        <div className="bg-gray-200 rounded w-32 h-10 animate-pulse"></div>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-gray-200 rounded h-10 animate-pulse"></div>
          ))}
        </div>
      </div>

      <div className="flex flex-col flex-1">
        {/* Header Skeleton */}
        <div className="bg-white px-8 py-4 border-gray-200 border-b">
          <div className="bg-gray-200 rounded w-48 h-8 animate-pulse"></div>
        </div>

        {/* Main Content Skeleton */}
        <main className="gap-8 grid grid-cols-1 xl:grid-cols-[2fr_1fr] md:ml-[calc(16rem)] p-8 overflow-y-auto">
          <div className="flex flex-col gap-8">
            {/* Stat Cards Skeleton */}
            <div className="gap-[25px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-200 rounded-lg h-[120px] animate-pulse"
                ></div>
              ))}
            </div>

            {/* Chart Skeleton */}
            <div className="bg-gray-200 rounded-lg h-[300px] animate-pulse"></div>

            {/* Transactions Skeleton */}
            <div className="bg-gray-200 rounded-lg h-[400px] animate-pulse"></div>
          </div>

          {/* Right Column Skeleton */}
          <div className="flex flex-col gap-8">
            <div className="bg-gray-200 rounded-lg h-[300px] animate-pulse"></div>
            <div className="bg-gray-200 rounded-lg h-[300px] animate-pulse"></div>
          </div>
        </main>
      </div>
    </div>
  );
}