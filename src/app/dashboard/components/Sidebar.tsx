// src/app/dashboard/components/Sidebar.tsx
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query"; // Import useQueryClient

// 1. Define the client-side fetcher function
export const logoutUser = async () => {
    // URL hits your Next.js API Route handler (e.g., /app/api/logout/route.js)
    const response = await fetch('/api/users/logout', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        // Throwing an error is crucial for the onError handler in useMutation
        const errorData = await response.json().catch(() => ({ message: 'Logout failed' }));
        throw new Error(errorData.message || 'Logout failed on the server.');
    }

    return response.json();
};
export default function Sidebar() {
  const router = useRouter();
  const queryClient = useQueryClient(); // Initialize query client

  const navItems = [
    { name: "Dashboard", icon: "/home-icon.svg", active: true },
    { name: "Transactions", icon: "/transaction-icon.svg" },
    { name: "Invoices", icon: "/invoices-icon.svg" },
    { name: "My Wallets", icon: "/My-Wallets.svg" },
    { name: "Settings", icon: "/settings-icon.svg" },
  ];

  // 2. Use the useMutation hook
  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
        // Invalidate or remove any authentication-related queries (e.g., the user profile)
        queryClient.invalidateQueries({ queryKey: ['user'] });
        queryClient.removeQueries({ queryKey: ['user'] });
        
        // Redirect to the login page after successful logout
        router.push('/');
    },
    onError: (error) => {
        // Handle the error, e.g., show a toast or a notification
        console.error("Logout Error:", error.message);
        alert(`Logout failed: ${error.message}`); // Simple error display
    },
  });

  // Handler to execute the mutation
  const handleLogout = (e) => {
    e.preventDefault(); // Prevent default link behavior
    logoutMutation.mutate();
  };


  return (
    <aside className="hidden md:fixed md:flex flex-col flex-shrink-0 bg-[#FAFAFA] w-64 h-screen">
      <div className="flex items-center gap-2 mb-8 px-8 pt-[30px] h-20">
        <Image
          src="/maglo-logo.svg"
          alt="Maglo Logo"
          className="w-auto h-[30px]"
          width={30}
          height={30}
        />
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
            <Image
              src={item.icon}
              alt={item.name}
              className="w-4 h-4"
              width={16}
              height={16}
            />
            {item.name}
          </a>
        ))}
      </nav>

      <div className="space-y-2 px-6 md:pb-30">
        <a
          href="#"
          className="flex items-center gap-3 hover:bg-gray-100 px-4 py-3 rounded-lg font-medium text-[#929EAE] text-[17px] transition-colors duration-200"
        >
          <Image src="/help.svg" alt="Help" className="w-4 h-4" width={16} height={16} /> Help
        </a>
        {/* 3. Attach the handler to the Logout link */}
        <a
          href="#"
          onClick={handleLogout} // Use the TanStack Query handler
          className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-[17px] transition-colors duration-200 ${
            logoutMutation.isPending 
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed' // Style for pending state
            : 'hover:bg-gray-100 text-[#929EAE]'
          }`}
          // Optional: Disable link visually/functionally while logging out
          aria-disabled={logoutMutation.isPending}
        >
          <Image 
            src="/logout.svg" 
            alt="Logout" 
            className="w-4 h-4" 
            width={16} 
            height={16} 
          /> 
          {/* Change text while loading */}
          {logoutMutation.isPending ? 'Logging out...' : 'Logout'}
        </a>
      </div>
    </aside>
  );
}