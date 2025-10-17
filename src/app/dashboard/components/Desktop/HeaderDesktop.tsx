"use client";

import { CircleUserRound } from "lucide-react";
import type { UserProfile } from "@/types/types";
import Image from "next/image";

export default function HeaderDesktop({ user }: { user?: UserProfile }) {
  return (
    <header className="hidden md:flex justify-between items-center bg-white shadow-sm md:shadow-none md:ml-[calc(16rem)] px-8 py-6 w-auto">
      <h1 className="font-semibold text-gray-900 text-2xl">Dashboard</h1>

      <div className="flex items-center gap-[45px]">
        <button className="text-gray-500 hover:text-gray-800">
          <Image src="/search-icon.svg" alt="Search Icon" className="w-6 h-6" width={24} height={24} />
        </button>

        <button className="text-gray-500 hover:text-gray-800">
          <Image src="/notification-icon.svg" alt="Notification Icon" className="w-6 h-6" width={24} height={24} />
        </button>

        <div className="flex items-center bg-[#FAFAFA] px-3 py-1.5 rounded-full">
          {user ? (
            <>
              <CircleUserRound className="w-8 h-8 text-gray-400" />
              <div className="flex items-center ml-2">
                <span className="font-semibold text-[#1B212D] text-base">{user.fullName}</span>
                <Image
                  src="/down.svg"
                  alt="Down Icon"
                  width={10}
                  height={10}
                  className="ml-2 w-3 h-3"
                />
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
