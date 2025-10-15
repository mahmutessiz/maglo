"use client";
import {
  LayoutDashboard,
  ArrowRightLeft,
  FileText,
  Wallet as WalletIcon,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, active: true },
    { name: "Transactions", icon: ArrowRightLeft },
    { name: "Invoices", icon: FileText },
    { name: "My Wallets", icon: WalletIcon },
    { name: "Settings", icon: Settings },
  ];

  return (
    <aside className="flex flex-col flex-shrink-0 bg-white border-gray-200 border-r w-64">
      <div className="flex items-center px-8 h-20">
        <h1 className="font-bold text-gray-800 text-2xl">Maglo.</h1>
      </div>

      <nav className="flex-1 space-y-2 px-6">
        {navItems.map((item) => (
          <a
            key={item.name}
            href="#"
            className={`flex items-center px-4 py-3 rounded-lg text-gray-700 font-medium transition-colors duration-200 ${
              item.active ? "bg-lime-400 text-gray-900" : "hover:bg-gray-100"
            }`}
          >
            <item.icon className="mr-3 w-5 h-5" />
            {item.name}
          </a>
        ))}
      </nav>

      <div className="space-y-2 px-6 py-8">
        <a
          href="#"
          className="flex items-center hover:bg-gray-100 px-4 py-3 rounded-lg font-medium text-gray-700"
        >
          <HelpCircle className="mr-3 w-5 h-5" /> Help
        </a>
        <a
          href="#"
          className="flex items-center hover:bg-gray-100 px-4 py-3 rounded-lg font-medium text-gray-700"
        >
          <LogOut className="mr-3 w-5 h-5" /> Logout
        </a>
      </div>
    </aside>
  );
}
