"use client";

import { useState } from "react";
import { Menu, CircleUserRound } from "lucide-react";
import type { UserProfile } from "@/types/types";
import Image from "next/image";
import Sidebar from "../Sidebar";

export default function HeaderMobile({ user }: { user?: UserProfile }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header className="md:hidden top-0 z-40 sticky flex justify-between items-center bg-white shadow-sm px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="hover:bg-gray-100 p-2 rounded-lg"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="font-semibold text-gray-900 text-lg">Dashboard</h1>
        </div>

        <div className="flex items-center gap-3">
          <button className="text-gray-500 hover:text-gray-800">
            <Image src="/notification-icon.svg" alt="Notifications" className="w-6 h-6" width={24} height={24} />
          </button>
          <CircleUserRound className="w-7 h-7 text-gray-500" />
        </div>
      </header>

      {/* Overlay Sidebar */}
      {sidebarOpen && (
        <div
          className="z-50 fixed inset-0 bg-black/30"
          onClick={() => setSidebarOpen(false)}
        >
          <div
            className="top-0 left-0 fixed bg-[#FAFAFA] shadow-lg w-64 h-full animate-slideIn"
            onClick={(e) => e.stopPropagation()}
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
