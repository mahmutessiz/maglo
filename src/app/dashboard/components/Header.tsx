"use client";
import { Search, Bell, CircleUserRound, ChevronDown } from "lucide-react";
import type { UserProfile } from "../../../types/types";

export default function Header({ user }: { user?: UserProfile }) {
  return (
    <header className="flex justify-between items-center bg-white px-8 border-gray-200 border-b h-20">
      <h1 className="font-bold text-gray-900 text-3xl">Dashboard</h1>

      <div className="flex items-center space-x-6">
        <button className="text-gray-500 hover:text-gray-800">
          <Search className="w-6 h-6" />
        </button>
        <button className="text-gray-500 hover:text-gray-800">
          <Bell className="w-6 h-6" />
        </button>

        <div className="flex items-center space-x-3">
          {user ? (
            <>
              <CircleUserRound className="w-10 h-10 text-gray-400" />
              <div className="flex items-center">
                <span className="font-semibold text-gray-800">
                  {user.fullName}
                </span>
                <ChevronDown className="ml-1 w-4 h-4 text-gray-500" />
              </div>
            </>
          ) : (
            <div className="bg-gray-200 rounded-full w-10 h-10 animate-pulse"></div>
          )}
        </div>
      </div>
    </header>
  );
}
