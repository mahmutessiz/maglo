"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";

type UserProfile = {
  id: string;
  fullName: string;
  email: string;
  role: string;
  isActive: boolean;
  lastLoginAt: string;
  lastLoginIP: string;
  createdAt: string;
  updatedAt: string;
};

type FinancialSummary = {
  totalBalance: {
    amount: number;
    currency: string;
    change: {
      percentage: number;
      trend: string;
    };
  };
  totalExpense: {
    amount: number;
    currency: string;
    change: {
      percentage: number;
      trend: string;
    };
  };
  totalSavings: {
    amount: number;
    currency: string;
    change: {
      percentage: number;
      trend: string;
    };
  };
  lastUpdated: string;
};

type WorkingCapital = {
  period: string;
  currency: string;
  data: Array<{
    month: string;
    income: number;
    expense: number;
    net: number;
  }>;
  summary: {
    totalIncome: number;
    totalExpense: number;
    netBalance: number;
  };
};

export default function Dashboard() {

  const { data: user, isLoading, isError } = useQuery<UserProfile>({
    queryKey: ["profile"],
    queryFn: async () => {
      const token = localStorage.getItem('accessToken');
      
      if (!token) {
        return Promise.reject(new Error("No token found"));
      }

      const res = await fetch('/api/users/profile', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        localStorage.removeItem('accessToken');
        return Promise.reject(new Error("Unauthorized"));
      }

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to fetch profile");
      }

      const responseData = await res.json();
      return responseData.data;
    },
  });

    const { data: summary, isLoading: summaryLoading, isError: summaryError } = useQuery<FinancialSummary>({
    queryKey: ["summary"],
    queryFn: async () => {
      const token = localStorage.getItem('accessToken');
      
      if (!token) {
        return Promise.reject(new Error("No token found"));
      }

      const res = await fetch('/api/financial/summary', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        localStorage.removeItem('accessToken');
        return Promise.reject(new Error("Unauthorized"));
      }

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to fetch profile");
      }

      const responseData = await res.json();
      return responseData.data;
    },
  });

  const { data: workingCapital, isLoading: workingCapitalLoading, isError: workingCapitalError } = useQuery<WorkingCapital>({
    queryKey: ["workingCapital"],
    queryFn: async () => {
      const token = localStorage.getItem('accessToken');
      
      if (!token) {
        return Promise.reject(new Error("No token found"));
      }

      const res = await fetch('/api/financial/working-capital', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        localStorage.removeItem('accessToken');
        return Promise.reject(new Error("Unauthorized"));
      }

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to fetch working capital");
      }

      const responseData = await res.json();
      return responseData.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <p className="text-gray-500 text-xl">Loading your profile...</p>
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <p className="text-red-500 text-xl">Failed to load profile.</p>
      </div>
    );
  }

  return (
    <div className="flex bg-white min-h-screen">
      {/* Left Section - Profile Info */}
      <div className="flex flex-col flex-1 justify-center items-center px-10 md:px-24 py-8">
        <h1 className="mb-4 font-semibold text-gray-900 text-3xl">
          Welcome, {user.fullName}!
        </h1>
        <p className="mb-6 text-gray-600">Email: {user.email}</p>

        <div className="flex flex-col gap-4 w-full max-w-sm">
          <p className="text-gray-700">
            Role: <span className="font-bold">{user.role}</span>
          </p>
          <p className="text-gray-700">
            Last Login:{" "}
            <span className="font-bold">{new Date(user.lastLoginAt).toLocaleString()}</span>
          </p>
          <p className="text-gray-700">
            Account Active:{" "}
            <span className="font-bold">{user.isActive ? "Yes" : "No"}</span>
          </p>
        </div>
      </div>

      {/* Right Section - Financial Summary and Working Capital */}
      <div className="flex flex-1 flex-col md:flex-row gap-6 p-10">
        {/* Financial Summary Card */}
        <div className="flex-1 bg-gray-50 p-6 rounded-xl">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Financial Summary</h2>
          
          {summaryLoading ? (
            <p className="text-gray-500">Loading financial summary...</p>
          ) : summaryError ? (
            <p className="text-red-500">Failed to load financial summary</p>
          ) : summary ? (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <h3 className="font-medium text-gray-700">Total Balance</h3>
                <p className="text-2xl font-bold text-gray-900">
                  {summary.totalBalance.amount.toLocaleString()} {summary.totalBalance.currency}
                </p>
                <p className={`text-sm ${summary.totalBalance.change.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {summary.totalBalance.change.trend === 'up' ? '↑' : '↓'} {summary.totalBalance.change.percentage}% from last period
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <h3 className="font-medium text-gray-700">Total Expenses</h3>
                <p className="text-2xl font-bold text-gray-900">
                  {summary.totalExpense.amount.toLocaleString()} {summary.totalExpense.currency}
                </p>
                <p className={`text-sm ${summary.totalExpense.change.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {summary.totalExpense.change.trend === 'up' ? '↑' : '↓'} {summary.totalExpense.change.percentage}% from last period
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <h3 className="font-medium text-gray-700">Total Savings</h3>
                <p className="text-2xl font-bold text-gray-900">
                  {summary.totalSavings.amount.toLocaleString()} {summary.totalSavings.currency}
                </p>
                <p className={`text-sm ${summary.totalSavings.change.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {summary.totalSavings.change.trend === 'up' ? '↑' : '↓'} {summary.totalSavings.change.percentage}% from last period
                </p>
              </div>
              
              <div className="text-xs text-gray-500 mt-4">
                Last updated: {new Date(summary.lastUpdated).toLocaleString()}
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No financial summary data available</p>
          )}
        </div>
        
        {/* Working Capital Card */}
        <div className="flex-1 bg-gray-50 p-6 rounded-xl">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Working Capital</h2>
          
          {workingCapitalLoading ? (
            <p className="text-gray-500">Loading working capital...</p>
          ) : workingCapitalError ? (
            <p className="text-red-500">Failed to load working capital</p>
          ) : workingCapital ? (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-3 rounded-lg shadow-sm border text-center">
                  <h3 className="font-medium text-gray-700 text-sm">Total Income</h3>
                  <p className="text-lg font-bold text-gray-900">
                    {workingCapital.summary.totalIncome.toLocaleString()} {workingCapital.currency}
                  </p>
                </div>
                
                <div className="bg-white p-3 rounded-lg shadow-sm border text-center">
                  <h3 className="font-medium text-gray-700 text-sm">Total Expenses</h3>
                  <p className="text-lg font-bold text-gray-900">
                    {workingCapital.summary.totalExpense.toLocaleString()} {workingCapital.currency}
                  </p>
                </div>
                
                <div className="bg-white p-3 rounded-lg shadow-sm border text-center">
                  <h3 className="font-medium text-gray-700 text-sm">Net Balance</h3>
                  <p className="text-lg font-bold text-gray-900">
                    {workingCapital.summary.netBalance.toLocaleString()} {workingCapital.currency}
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-700 mb-3">Monthly Breakdown ({workingCapital.period})</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {workingCapital.data.map((item, index) => (
                    <div key={index} className="bg-white p-3 rounded-lg shadow-sm border flex justify-between items-center">
                      <span className="font-medium">{item.month}</span>
                      <div className="flex gap-4">
                        <span className="text-green-600">+{item.income.toLocaleString()}</span>
                        <span className="text-red-600">-{item.expense.toLocaleString()}</span>
                        <span className={`font-bold ${item.net >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {item.net >= 0 ? '+' : ''}{item.net.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="text-xs text-gray-500 mt-4">
                Period: {workingCapital.period}
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No working capital data available</p>
          )}
        </div>
      </div>
    </div>
  );
}