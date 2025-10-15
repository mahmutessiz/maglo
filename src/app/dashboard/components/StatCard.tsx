import React from "react";

export default function StatCard({
  title,
  amount,
  icon: Icon,
}: {
  title: string;
  amount: string;
  icon: React.ElementType;
}) {
  return (
    <div className="flex items-center space-x-4 bg-white shadow-sm p-6 border border-gray-200 rounded-2xl">
      <div className="bg-gray-100 p-3 rounded-full">
        <Icon className="w-6 h-6 text-gray-800" />
      </div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="font-bold text-gray-900 text-2xl">{amount}</p>
      </div>
    </div>
  );
}
