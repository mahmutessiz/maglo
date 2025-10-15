"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Dot,
} from "recharts";
import {
  LayoutDashboard,
  ArrowRightLeft,
  FileText,
  Wallet as WalletIcon,
  Settings,
  HelpCircle,
  LogOut,
  Search,
  Bell,
  MoreHorizontal,
  CircleUserRound,
  ChevronDown,
  Dot as DotIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

// --- TYPE DEFINITIONS (from your original code) ---
// Note: Adjusted some types slightly to better match the UI in the image.

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
  };
  totalExpense: {
    amount: number;
    currency: string;
  };
  totalSavings: {
    amount: number;
    currency: string;
  };
};

type WorkingCapital = {
  period: string;
  currency: string;
  data: Array<{
    date: string; // Using 'date' for more accurate charting as per the image
    income: number;
    expense: number;
  }>;
};

type WalletCard = {
  id: string;
  name: string;
  type: string;
  cardNumber: string;
  bank: string;
  network: string; // 'visa', 'mastercard' etc.
  expiryMonth: number;
  expiryYear: number;
  // NOTE: Changed 'color' to 'gradient' to support the visual design.
  // Your API should ideally return an array of two color strings.
  gradient: string[];
  isDefault: boolean;
};

type WalletData = {
  cards: WalletCard[];
};

type ScheduledTransfer = {
  id: string;
  name: string;
  image: string;
  date: string;
  amount: number;
  currency: string;
};

type ScheduledTransfersData = {
  transfers: ScheduledTransfer[];
};

type Transaction = {
  id: string;
  name: string;
  business: string;
  image: string;
  type: string;
  amount: number;
  currency: string;
  date: string;
};

type TransactionsData = {
  transactions: Transaction[];
};

// --- HELPER FUNCTIONS ---
const formatCurrency = (amount: number, currency = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
  }).format(amount);
};

// --- UI COMPONENTS ---

const Sidebar = () => {
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
              item.active ? "bg-lime-300 text-gray-900" : "hover:bg-gray-100"
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
};

const Header = ({ user }: { user: UserProfile | undefined }) => (
  <header className="flex justify-between items-center bg-white px-8 border-gray-200 border-b h-20">
    <h1 className="font-bold text-gray-900 text-3xl">Dashboard</h1>
    <div className="flex items-center space-x-6">
      <button className="text-gray-500 hover:text-gray-800">
        <Search className="w-6 h-6" />
      </button>
      <button className="text-gray-500 hover:text-gray-800">
        <Bell className="w-6 h-6" />
      </button>
      <div className="flex items-center space-x-3">
        {user ? (
          <>
            <CircleUserRound className="w-10 h-10 text-gray-400" />
            <div className="flex items-center">
              <span className="font-semibold text-gray-800">
                {user.fullName}
              </span>
              <ChevronDown className="ml-1 w-4 h-4 text-gray-500" />
            </div>
          </>
        ) : (
          <div className="bg-gray-200 rounded-full w-10 h-10 animate-pulse"></div>
        )}
      </div>
    </div>
  </header>
);

const StatCard = ({
  title,
  amount,
  icon: Icon,
}: {
  title: string;
  amount: string;
  icon: React.ElementType;
}) => (
  <div className="flex items-center space-x-4 bg-white shadow-sm p-6 border border-gray-200 rounded-2xl">
    <div className="bg-gray-100 p-3 rounded-full">
      <Icon className="w-6 h-6 text-gray-800" />
    </div>
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="font-bold text-gray-900 text-2xl">{amount}</p>
    </div>
  </div>
);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload.find((p) => p.dataKey === "income");
    if (data) {
      return (
        <div className="bg-gray-800 shadow-lg p-2 px-4 rounded-md text-white">
          <p className="font-bold">{formatCurrency(data.value)}</p>
        </div>
      );
    }
  }
  return null;
};

const WorkingCapitalChart = ({
  data,
}: {
  data: WorkingCapital | undefined;
}) => {
  const chartData = data?.data.map((item) => ({
    name: new Date(item.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    income: item.income,
    expenses: item.expense,
  }));

  return (
    <div className="bg-white shadow-sm p-6 border border-gray-200 rounded-2xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-gray-800 text-xl">Working Capital</h2>
        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center">
            <DotIcon className="text-lime-400" /> Income
          </div>
          <div className="flex items-center">
            <DotIcon className="text-yellow-400" /> Expenses
          </div>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-600">
            Last 7 Days
          </button>
        </div>
      </div>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#A3E635" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#A3E635" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FBBF24" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#FBBF24" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              dy={10}
              tick={{ fill: "#6B7280", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `${value / 1000}K`}
              tick={{ fill: "#6B7280", fontSize: 12 }}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: "hsl(var(--primary))",
                strokeWidth: 1,
                strokeDasharray: "3 3",
              }}
            />
            <Area
              type="monotone"
              dataKey="income"
              stroke="#A3E635"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorIncome)"
              activeDot={{
                r: 8,
                fill: "#A3E635",
                stroke: "white",
                strokeWidth: 2,
              }}
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke="#FBBF24"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorExpense)"
              activeDot={{
                r: 8,
                fill: "#FBBF24",
                stroke: "white",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const RecentTransactions = ({
  data,
}: {
  data: TransactionsData | undefined;
}) => {
  return (
    <div className="bg-white shadow-sm p-6 border border-gray-200 rounded-2xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-gray-800 text-xl">Recent Transaction</h2>
        <a
          href="#"
          className="font-medium text-gray-600 hover:text-gray-900 text-sm"
        >
          View All
        </a>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="font-medium text-gray-500 text-left">
            <th className="px-3 py-2">NAME/BUSINESS</th>
            <th className="px-3 py-2">TYPE</th>
            <th className="px-3 py-2">AMOUNT</th>
            <th className="px-3 py-2">DATE</th>
          </tr>
        </thead>
        <tbody>
          {data?.transactions.map((tx) => (
            <tr key={tx.id} className="border-gray-100 border-t">
              <td className="px-3 py-4">
                <div className="flex items-center space-x-3">
                  <div className="flex justify-center items-center bg-gray-100 rounded-lg w-10 h-10">
                    <img
                      src={tx.image}
                      alt={tx.name}
                      className="w-6 h-6 rounded object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null; // Prevent infinite loop
                        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(tx.name)}&background=gray&color=fff&size=100`;
                      }}
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{tx.name}</p>
                    <p className="text-gray-500">{tx.business}</p>
                  </div>
                </div>
              </td>
              <td className="px-3 py-4 text-gray-500">{tx.type}</td>
              <td className="px-3 py-4 font-semibold text-gray-800">
                {formatCurrency(tx.amount)}
              </td>
              <td className="px-3 py-4 text-gray-500">
                {new Date(tx.date).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const CreditCard = ({ card }: { card: WalletCard }) => {
  const cardStyle = {
    background: `black`,
  };

  return (
    <div
      style={cardStyle}
      className="relative flex flex-col justify-between shadow-lg p-6 rounded-2xl h-52 text-white"
    >
      <div>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold">{card.name}</h3>
            <p className="opacity-80 text-xs">{card.bank}</p>
          </div>
          <Image
            src={`/${card.network.toLowerCase()}.svg`}
            alt={card.network}
            width={40}
            height={25}
          />
        </div>
      </div>
      <div>
        <p className="font-mono text-xl tracking-wider">
          {card.cardNumber.replace(/(\d{4})/g, "$1 ").trim()}
        </p>
        <p className="opacity-80 mt-1 text-xs">
          {`0${card.expiryMonth}`.slice(-2)}/{String(card.expiryYear).slice(-2)}
        </p>
      </div>
    </div>
  );
};

const Wallet = ({ data }: { data: WalletData | undefined }) => (
  <div className="bg-white shadow-sm p-6 border border-gray-200 rounded-2xl">
    <div className="flex justify-between items-center mb-4">
      <h2 className="font-bold text-gray-800 text-xl">Wallet</h2>
      <button className="text-gray-500">
        <MoreHorizontal />
      </button>
    </div>
    <div className="space-y-[-80px]">
      {data?.cards.map((card) => (
        <CreditCard key={card.id} card={card} />
      ))}
    </div>
  </div>
);

const ScheduledTransfers = ({
  data,
}: {
  data: ScheduledTransfersData | undefined;
}) => (
  <div className="bg-white shadow-sm p-6 border border-gray-200 rounded-2xl">
    <div className="flex justify-between items-center mb-4">
      <h2 className="font-bold text-gray-800 text-xl">Scheduled Transfers</h2>
      <a
        href="#"
        className="font-medium text-gray-600 hover:text-gray-900 text-sm"
      >
        View All
      </a>
    </div>
    <div className="space-y-4">
      {data?.transfers.map((transfer) => (
        <div key={transfer.id} className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="relative flex-shrink-0">
              <img
                src={transfer.image}
                alt={transfer.name}
                className="w-10 h-10 rounded-full object-cover border border-gray-200"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null; // Prevent infinite loop
                  target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(transfer.name)}&background=gray&color=fff&size=100`;
                }}
              />
            </div>
            <div>
              <p className="font-semibold text-gray-800">{transfer.name}</p>
              <p className="text-gray-500 text-xs">
                {new Date(transfer.date).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
          <p className="font-bold text-gray-900">
            {formatCurrency(transfer.amount)}
          </p>
        </div>
      ))}
    </div>
  </div>
);

// --- MAIN DASHBOARD COMPONENT ---

export default function Dashboard() {
  const router = useRouter();

  const handleAuthError = () => {
    localStorage.removeItem("accessToken");
    router.push("/login"); // Or your login route
  };

  const fetcher = async (url: string) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      handleAuthError();
      return Promise.reject(new Error("No token found"));
    }
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 401) {
      handleAuthError();
      return Promise.reject(new Error("Unauthorized"));
    }
    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.message || `Failed to fetch data from ${url}`);
    }
    const responseData = await res.json();
    return responseData.data;
  };

  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
  } = useQuery<UserProfile>({
    queryKey: ["profile"],
    queryFn: () => fetcher("/api/users/profile"),
  });

  const {
    data: summary,
    isLoading: summaryLoading,
    isError: summaryError,
  } = useQuery<FinancialSummary>({
    queryKey: ["summary"],
    queryFn: () => fetcher("/api/financial/summary"),
  });

  const {
    data: workingCapital,
    isLoading: workingCapitalLoading,
    isError: workingCapitalError,
  } = useQuery<WorkingCapital>({
    queryKey: ["workingCapital"],
    queryFn: () => fetcher("/api/financial/working-capital"),
  });

  const {
    data: walletData,
    isLoading: walletLoading,
    isError: walletError,
  } = useQuery<WalletData>({
    queryKey: ["wallet"],
    queryFn: () => fetcher("/api/financial/wallet"),
  });

  const {
    data: scheduledTransfers,
    isLoading: scheduledTransfersLoading,
    isError: scheduledTransfersError,
  } = useQuery<ScheduledTransfersData>({
    queryKey: ["scheduledTransfers"],
    queryFn: () => fetcher("/api/financial/transfers/scheduled"),
  });

  const {
    data: recentTransactions,
    isLoading: transactionsLoading,
    isError: transactionsError,
  } = useQuery<TransactionsData>({
    queryKey: ["recentTransactions"],
    queryFn: () => fetcher("/api/financial/transactions/recent"),
  });

  if (userLoading) {
    return (
      <div className="flex justify-center items-center w-full h-screen text-xl">
        Loading Dashboard...
      </div>
    );
  }

  if (userError) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <p className="text-red-500 text-xl">
          Failed to load profile. Redirecting to login...
        </p>
      </div>
    );
  }

  return (
    <div className="flex bg-[#F9F9F9] min-h-screen text-gray-800">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header user={user} />
        <main className="flex-1 gap-8 grid grid-cols-1 xl:grid-cols-3 p-8 overflow-y-auto">
          {/* Main Content */}
          <div className="flex flex-col gap-8 xl:col-span-2">
            <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
              {summaryLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-gray-200 rounded-2xl h-28 animate-pulse"
                  ></div>
                ))
              ) : summaryError ? (
                <p className="col-span-3 text-red-500">
                  Could not load financial summary.
                </p>
              ) : summary ? (
                <>
                  <StatCard
                    title="Total balance"
                    amount={formatCurrency(
                      summary.totalBalance.amount,
                      summary.totalBalance.currency
                    )}
                    icon={WalletIcon}
                  />
                  <StatCard
                    title="Total spending"
                    amount={formatCurrency(
                      summary.totalExpense.amount,
                      summary.totalExpense.currency
                    )}
                    icon={ArrowRightLeft}
                  />
                  <StatCard
                    title="Total saved"
                    amount={formatCurrency(
                      summary.totalSavings.amount,
                      summary.totalSavings.currency
                    )}
                    icon={FileText}
                  />
                </>
              ) : null}
            </div>
            {workingCapitalLoading ? (
              <div className="bg-gray-200 rounded-2xl h-96 animate-pulse"></div>
            ) : workingCapitalError ? (
              <p className="text-red-500">
                Could not load working capital chart.
              </p>
            ) : (
              <WorkingCapitalChart data={workingCapital} />
            )}
            {transactionsLoading ? (
              <div className="bg-gray-200 rounded-2xl h-72 animate-pulse"></div>
            ) : transactionsError ? (
              <p className="text-red-500">
                Could not load recent transactions.
              </p>
            ) : (
              <RecentTransactions data={recentTransactions} />
            )}
          </div>

          {/* Right Sidebar */}
          <div className="flex flex-col gap-8 xl:col-span-1">
            {walletLoading ? (
              <div className="bg-gray-200 rounded-2xl h-64 animate-pulse"></div>
            ) : walletError ? (
              <p className="text-red-500">Could not load wallet.</p>
            ) : (
              <Wallet data={walletData} />
            )}
            {scheduledTransfersLoading ? (
              <div className="bg-gray-200 rounded-2xl h-96 animate-pulse"></div>
            ) : scheduledTransfersError ? (
              <p className="text-red-500">
                Could not load scheduled transfers.
              </p>
            ) : (
              <ScheduledTransfers data={scheduledTransfers} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
