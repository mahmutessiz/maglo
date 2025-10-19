"use client";

import type { UserProfile } from "@/types/types";
import Image from "next/image";


export default function HeaderDesktop({ user}: { user?: UserProfile }) {

  return (
    <header className="hidden md:flex justify-between items-center bg-white shadow-sm md:shadow-none px-8 pt-[30px] w-auto">
      <h1 className="font-semibold text-[#1B212D] text-[25px]">Dashboard</h1>

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
              <div className="flex justify-center items-center bg-lime-400 rounded-full w-9 h-9 font-bold">
                <span>{user.fullName[0].toUpperCase() + user.fullName.split(" ")[1][0].toUpperCase()}</span>
              </div>
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
