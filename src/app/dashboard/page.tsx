"use client";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatCard from "./components/StatCard";
import WorkingCapitalChart from "./components/WorkingCapitalChart";
import RecentTransactions from "./components/RecentTransactions";
import Wallet from "./components/Wallet/Wallet";
import ScheduledTransfers from "./components/ScheduledTransfers";
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

  const fetcher = async (url: string) => {
    const token = localStorage.getItem("accessToken");
    if (!token) router.push("/");

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 401) router.push("/");
    const json = await res.json();
    return json.data;
  };

  const { data: user } = useQuery<UserProfile>({
    queryKey: ["profile"],
    queryFn: () => fetcher("/api/users/profile"),
  });

  const { data: summary } = useQuery<FinancialSummary>({
    queryKey: ["summary"],
    queryFn: () => fetcher("/api/financial/summary"),
  });

  const { data: workingCapital } = useQuery<WorkingCapital>({
    queryKey: ["workingCapital"],
    queryFn: () => fetcher("/api/financial/working-capital"),
  });

  const { data: walletData } = useQuery<WalletData>({
    queryKey: ["wallet"],
    queryFn: () => fetcher("/api/financial/wallet"),
  });

  const { data: scheduledTransfers } = useQuery<ScheduledTransfersData>({
    queryKey: ["scheduledTransfers"],
    queryFn: () => fetcher("/api/financial/transfers/scheduled"),
  });

  const { data: recentTransactions } = useQuery<TransactionsData>({
    queryKey: ["recentTransactions"],
    queryFn: () => fetcher("/api/financial/transactions/recent"),
  });

  return (
    <div className="flex bg-white min-h-screen text-gray-800">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header user={user} />

        <main className="gap-8 grid grid-cols-1 xl:grid-cols-[2fr_1fr] ml-[calc(16rem)] p-8 overflow-y-auto">
          <div className="flex flex-col gap-8">
            <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <StatCard
                title="Total balance"
                amount={formatCurrency(summary?.totalBalance.amount ?? 0)}
                bgColor="bg-[#363A3F]"
                iconBgColor="bg-[#4E5257]"
                textColor="text-white"
                titleColor="text-[#929EAE]"
                icon={"/wallet-yellow.svg"}
              />
              <StatCard
                title="Total spending"
                amount={formatCurrency(summary?.totalExpense.amount ?? 0)}
                icon={"/wallet-spending.svg"}
                bgColor="bg-[#F8F8F8]"
                iconBgColor="bg-[#EBE8E8]"
                titleColor="text-[#929EAE]"
                textColor="text-[#1B212D]"
              />
              <StatCard
                title="Total saved"
                amount={formatCurrency(summary?.totalSavings.amount ?? 0)}
                icon={"/wallet-saved.svg"}
                bgColor="bg-[#F8F8F8]"
                iconBgColor="bg-[#EBE8E8]"
                titleColor="text-[#929EAE]"
                textColor="text-[#1B212D]"
              />
            </div>

            <WorkingCapitalChart data={workingCapital} />
            <RecentTransactions data={recentTransactions} />
          </div>

          <div className="flex flex-col gap-8">
            <Wallet data={walletData} />
            <ScheduledTransfers data={scheduledTransfers} />
          </div>
        </main>
      </div>
    </div>
  );
}
