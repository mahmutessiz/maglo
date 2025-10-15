export default function LoadingSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="bg-gray-200 rounded-2xl w-full h-24"
          ></div>
        ))}
      </div>

      <div className="bg-gray-200 rounded-2xl w-full h-80"></div>
      <div className="bg-gray-200 rounded-2xl w-full h-80"></div>
    </div>
  );
}
