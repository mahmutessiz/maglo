"use client";
import { CircleUserRound } from "lucide-react";
import type { UserProfile } from "../../../types/types";
import Image from "next/image";
export default function Header({ user }: { user?: UserProfile }) {
  return (
    <header className="flex flex-wrap justify-between items-center bg-white md:ml-[calc(16rem)] px-8 pt-[30px]">
      <h1 className="font-semibold text-[25px] text-gray-900">Dashboard</h1>

      <div className="flex items-center gap-[45px] space-x-6">
        <button className="text-gray-500 hover:text-gray-800">
          <Image
            src="/search-icon.svg"
            alt="Search Icon"
            className="w-6 h-6"
            width={30}
            height={30}
          />
        </button>
        <button className="text-gray-500 hover:text-gray-800">
          <Image
            src="/notification-icon.svg"
            alt="Notification Icon"
            className="w-6 h-6"
            width={30}  
            height={30}
          />
        </button>

        <div className="flex items-center space-x-3 bg-[#FAFAFA] pt-[6px] pr-[15px] pb-[6px] pl-[7px] rounded-full">
          {user ? (
            <>
              <CircleUserRound className="w-8 h-8 text-gray-400" />
              <div className="flex items-center h-[36px]">
                <span className="font-semibold text-gray-800">
                  {user.fullName}
                </span>
                {/* <ChevronDown className="ml-2 w-4 h-4 text-gray-500" strokeWidth={4} /> */}
                <Image
                  src="/down.svg"
                  alt="Chevron Down Icon"
                  className="ml-2 w-3 h-3"
                  width={10}
                  height={10}
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
