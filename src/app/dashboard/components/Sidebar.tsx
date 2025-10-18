"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";

// --- Logout Mutation Function ---
const logoutUser = async () => {
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: "Logout failed" }));
    throw new Error(errorData.message || "Logout failed on the server.");
  }

  return response.json();
};

export default function Sidebar({ isMobile = false }: { isMobile?: boolean }) {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const router = useRouter();
  const queryClient = useQueryClient();

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.removeQueries({ queryKey: ["user"] });
      useAuthStore.getState().logout();
      router.push("/");
    },
    onError: (error) => {
      console.error("Logout Error:", error.message);
      alert(`Logout failed: ${error.message}`);
    },
  });

  const navItems = [
    {
      name: "Dashboard",
      icon: "/home-icon.svg",
      activeIcon: "/home-icon-active.svg",
    },
    {
      name: "Transactions",
      icon: "/transaction-icon.svg",
      activeIcon: "/transaction-icon-active.svg",
    },
    {
      name: "Invoices",
      icon: "/invoices-icon.svg",
      activeIcon: "/invoices-icon-active.svg",
    },
    {
      name: "My Wallets",
      icon: "/My-Wallets.svg",
      activeIcon: "/My-Wallets-active.svg",
    },
    {
      name: "Settings",
      icon: "/settings-icon.svg",
      activeIcon: "/settings-icon-active.svg",
    },
  ];

  return (
    <aside
      className={`flex flex-col flex-shrink-0 bg-[#FAFAFA] w-64 h-screen transition-transform duration-300 ${
        isMobile ? "shadow-lg" : "hidden md:flex md:fixed"
      }`}
    >
      
      <div className="flex items-center gap-2 mb-8 px-8 pt-[30px] h-20">
        <Image src="/maglo-logo.svg" alt="Maglo Logo" className="w-[30px] h-[30px]" width={30} height={30} />
        <h1 className="font-bold text-[#1B212D] text-lg">Maglo.</h1>
      </div>

     
      <nav className="flex-1 space-y-2 px-6">
        {navItems.map((item) => {
          const isActive = activeTab === item.name;
          return (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`flex items-center w-full text-left px-[15px] py-[14px] gap-3 rounded-lg font-medium text-[14px] transition-colors duration-200 ${
                isActive
                  ? "bg-[#C8EE44] text-[#1B212D]"
                  : "text-[#929EAE] hover:bg-gray-100"
              }`}
            >
              <Image
                src={isActive ? item.activeIcon : item.icon}
                alt={item.name}
                width={20}
                height={20}
                className="w-5 h-5"
              />
              {item.name}
            </button>
          );
        })}
      </nav>

      {/* --- Bottom Section --- */}
      <div className="space-y-2 mb-6 px-6 md:pb-30">
        <a
          href="#"
          className="flex items-center gap-3 hover:bg-gray-100 px-4 py-3 rounded-lg font-medium text-[#929EAE] text-[14px]"
        >
          <Image src="/help.svg" alt="Help" width={20} height={20} className="w-5 h-5" />
          Help
        </a>
        
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            logoutMutation.mutate();
          }}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-[14px] transition-all ${
            logoutMutation.isPending
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "hover:bg-gray-100 text-[#929EAE]"
          }`}
          aria-disabled={logoutMutation.isPending}
        >
          <Image src="/logout.svg" alt="Logout" width={20} height={20} className="w-5 h-5" />
          {logoutMutation.isPending ? "Logging out..." : "Logout"}
        </a>
      </div>
    </aside>
  );
}
