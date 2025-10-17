"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const logoutUser = async () => {
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
  const router = useRouter();
  const queryClient = useQueryClient();

  const navItems = [
    { name: "Dashboard", icon: "/home-icon.svg", active: true },
    { name: "Transactions", icon: "/transaction-icon.svg" },
    { name: "Invoices", icon: "/invoices-icon.svg" },
    { name: "My Wallets", icon: "/My-Wallets.svg" },
    { name: "Settings", icon: "/settings-icon.svg" },
  ];

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.removeQueries({ queryKey: ["user"] });
      localStorage.removeItem("accessToken");
      router.push("/");
    },
    onError: (error) => {
      console.error("Logout Error:", error.message);
      alert(`Logout failed: ${error.message}`);
    },
  });

  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    logoutMutation.mutate();
  };

  return (
    <aside
      className={`flex flex-col flex-shrink-0 bg-[#FAFAFA] w-64 h-screen transition-transform duration-300
        ${isMobile ? "shadow-lg" : "hidden md:flex md:fixed"}
      `}
    >
      <div className="flex items-center gap-2 mb-8 px-8 pt-[30px] h-20">
        <Image src="/maglo-logo.svg" alt="Maglo Logo" className="w-auto h-[30px]" width={30} height={30} />
        <h1 className="font-bold text-gray-800 text-2xl">Maglo.</h1>
      </div>

      <nav className="flex-1 space-y-2 px-6">
        {navItems.map((item) => (
          <a
            key={item.name}
            href="#"
            className={`flex items-center px-4 py-3 gap-3 rounded-lg text-gray-600 font-medium text-[17px] transition-colors duration-200 ${
              item.active ? "bg-lime-400 text-gray-900" : "hover:bg-gray-100"
            }`}
          >
            <Image src={item.icon} alt={item.name} className="w-4 h-4" width={16} height={16} />
            {item.name}
          </a>
        ))}
      </nav>

      <div className="space-y-2 px-6 md:pb-30">
        <a
          href="#"
          className="flex items-center gap-3 hover:bg-gray-100 px-4 py-3 rounded-lg font-medium text-[#929EAE] text-[17px]"
        >
          <Image src="/help.svg" alt="Help" className="w-4 h-4" width={16} height={16} /> Help
        </a>

        <a
          href="#"
          onClick={handleLogout}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-[17px] ${
            logoutMutation.isPending
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "hover:bg-gray-100 text-[#929EAE]"
          }`}
          aria-disabled={logoutMutation.isPending}
        >
          <Image src="/logout.svg" alt="Logout" className="w-4 h-4" width={16} height={16} />
          {logoutMutation.isPending ? "Logging out..." : "Logout"}
        </a>
      </div>
    </aside>
  );
}
