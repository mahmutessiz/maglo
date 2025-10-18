"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { toastError } from "@/lib/toast";
import { useAuthStore } from "@/stores/authStore";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatCard from "./components/StatCard";
import WorkingCapitalChart from "./components/WorkingCapitalChart";
import RecentTransactions from "./components/RecentTransactions";
import Wallet from "./components/Wallet/Wallet";
import ScheduledTransfers from "./components/ScheduledTransfers";
import StatCardSkeleton from "./components/skeletons/StatCardSkeleton";
import { formatCurrency } from "@/lib/utils";
import type {
  UserProfile,
  FinancialSummary,
  WorkingCapital,
  WalletData,
  ScheduledTransfersData,
  TransactionsData,
} from "../../types/types";

export default function DashboardPage() {
  const router = useRouter();
  const { accessToken, logout, isAuthenticated } = useAuthStore();
  const isReady = useAuthStore((state) => state._hasHydrated ?? true); // Wait for hydration

  // Redirect to login if not authenticated (but wait for hydration first)
  useEffect(() => {
    if (!isReady) return;

    if (!isAuthenticated || !accessToken) {
      router.push("/login");
    }
  }, [isReady, isAuthenticated, accessToken, router]);

  const fetcher = async (url: string) => {
    if (!accessToken) {
      toastError("Please login to continue", { position: "top-center" });
      logout();
      router.push("/login");
      return;
    }

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (res.status === 401) {
      toastError("Session expired. Please login again", {
        position: "top-center",
      });
      logout();
      router.push("/login");
      return;
    }

    if (!res.ok) {
      toastError("Failed to fetch data", { position: "top-center" });
      throw new Error("Failed to fetch data");
    }

    const json = await res.json();
    return json.data;
  };

  const { data: user, isLoading: userLoading } = useQuery<UserProfile>({
    queryKey: ["profile"],
    queryFn: () => fetcher("/api/users/profile"),
    enabled: !!accessToken,
  });

  const { data: summary, isLoading: summaryLoading } =
    useQuery<FinancialSummary>({
      queryKey: ["summary"],
      queryFn: () => fetcher("/api/financial/summary"),
      enabled: !!accessToken,
    });

  const { data: workingCapital, isLoading: workingCapitalLoading } =
    useQuery<WorkingCapital>({
      queryKey: ["workingCapital"],
      queryFn: () => fetcher("/api/financial/working-capital"),
      enabled: !!accessToken,
    });

  const { data: walletData, isLoading: walletLoading } = useQuery<WalletData>({
    queryKey: ["wallet"],
    queryFn: () => fetcher("/api/financial/wallet"),
    enabled: !!accessToken,
  });

  const { data: scheduledTransfers, isLoading: scheduledTransfersLoading } =
    useQuery<ScheduledTransfersData>({
      queryKey: ["scheduledTransfers"],
      queryFn: () => fetcher("/api/financial/transfers/scheduled"),
      enabled: !!accessToken,
    });

  const { data: recentTransactions, isLoading: recentTransactionsLoading } =
    useQuery<TransactionsData>({
      queryKey: ["recentTransactions"],
      queryFn: () => fetcher("/api/financial/transactions/recent"),
      enabled: !!accessToken,
    });

  // Show loading state while fetching
  const isLoading =
    userLoading ||
    summaryLoading ||
    workingCapitalLoading ||
    walletLoading ||
    scheduledTransfersLoading ||
    recentTransactionsLoading;

  if (!isAuthenticated || !accessToken) {
    return null;
  }

  return (
    <div className="flex bg-white min-h-screen text-gray-800">
      <Sidebar isLoading={isLoading} />
      <div className="flex flex-col flex-1">
        <Header user={user} isLoading={isLoading} />

        <main className="gap-8 grid grid-cols-1 xl:grid-cols-[2fr_1fr] md:ml-[calc(16rem)] p-8 overflow-y-auto">
          <div className="flex flex-col gap-8">
            {isLoading ? (
              <div className="gap-[25px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                <StatCardSkeleton />
                <StatCardSkeleton />
                <StatCardSkeleton />
              </div>
            ) : (
              <div className="gap-[25px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                <StatCard
                  title="Total balance"
                  amount={formatCurrency(summary?.totalBalance.amount ?? 0, summary?.totalBalance.currency ?? "USD")}
                  bgColor="bg-[#363A3F]"
                  iconBgColor="bg-[#4E5257]"
                  textColor="text-white"
                  titleColor="text-[#929EAE]"
                  icon={"/wallet-yellow.svg"}
                />
                <StatCard
                  title="Total spending"
                  amount={formatCurrency(summary?.totalExpense.amount ?? 0, summary?.totalExpense.currency ?? "USD")}
                  icon={"/wallet-spending.svg"}
                  bgColor="bg-[#F8F8F8]"
                  iconBgColor="bg-[#EBE8E8]"
                  titleColor="text-[#929EAE]"
                  textColor="text-[#1B212D]"
                />
                <StatCard
                  title="Total saved"
                  amount={formatCurrency(summary?.totalSavings.amount ?? 0, summary?.totalSavings.currency ?? "USD")}
                  icon={"/wallet-saved.svg"}
                  bgColor="bg-[#F8F8F8]"
                  iconBgColor="bg-[#EBE8E8]"
                  titleColor="text-[#929EAE]"
                  textColor="text-[#1B212D]"
                />{" "}
              </div>
            )}

            <WorkingCapitalChart
              data={workingCapital}
              isLoading={workingCapitalLoading}
            />
            <RecentTransactions
              data={recentTransactions}
              isLoading={recentTransactionsLoading}
            />
          </div>

          <div className="flex flex-col gap-8">
            <Wallet data={walletData} isLoading={isLoading} />
            <ScheduledTransfers
              data={scheduledTransfers}
              isLoading={scheduledTransfersLoading}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
