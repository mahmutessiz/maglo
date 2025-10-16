"use client";
import { useState } from "react";
import { CircleUserRound, Menu } from "lucide-react";
import type { UserProfile } from "../../../types/types";
import Image from "next/image";
import Sidebar from "./Sidebar";

export default function Header({ user }: { user?: UserProfile }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header className="flex justify-between items-center bg-white shadow-sm md:shadow-none md:ml-[calc(16rem)] px-4 sm:px-6 md:px-8 py-4 md:pt-[30px] w-full sm:w-auto">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden hover:bg-gray-100 p-2 rounded-lg"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>

          <h1 className="font-semibold text-gray-900 text-xl sm:text-2xl">Dashboard</h1>
        </div>

        <div className="flex items-center gap-4 sm:gap-6 md:gap-[45px]">
          <button className="hidden sm:block text-gray-500 hover:text-gray-800">
            <Image src="/search-icon.svg" alt="Search Icon" className="w-6 h-6" width={24} height={24} />
          </button>

          <button className="text-gray-500 hover:text-gray-800">
            <Image src="/notification-icon.svg" className="w-6 h-6" alt="Notification Icon" width={24} height={24} />
          </button>

          <div className="flex items-center bg-[#FAFAFA] px-2 sm:px-3 py-1.5 rounded-full">
            {user ? (
              <>
                <CircleUserRound className="w-7 sm:w-8 h-7 sm:h-8 text-gray-400" />
                <div className="flex items-center ml-2">
                  <span className="hidden sm:block font-semibold text-[#1B212D] text-sm sm:text-base">
                    {user.fullName}
                  </span>
                  <Image
                    src="/down.svg"
                    alt="Down Icon"
                    width={10}
                    height={10}
                    className="hidden sm:block ml-2 w-3 h-3"
                  />
                </div>
              </>
            ) : (
              <div className="bg-gray-200 rounded-full w-8 sm:w-10 h-8 sm:h-10 animate-pulse"></div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div
          className="md:hidden z-50 fixed inset-0 bg-black/30"
          onClick={() => setSidebarOpen(false)} // click outside closes
        >
          <div
            className="top-0 left-0 fixed bg-[#FAFAFA] shadow-lg w-64 h-full animate-slideIn"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside sidebar
          >
            <Sidebar isMobile />
            <button
              onClick={() => setSidebarOpen(false)}
              className="top-4 right-4 absolute text-gray-600 hover:text-gray-900"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
