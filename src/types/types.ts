// ----------------------------------------
// 👤 User types
// ----------------------------------------
export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  role: "user" | "admin";
  isActive: boolean;
  createdAt: string;
}

// ----------------------------------------
// 💰 Financial summary
// ----------------------------------------
export interface FinancialSummary {
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
}

// ----------------------------------------
// 📊 Working capital chart
// ----------------------------------------
export interface WorkingCapital {
  period: string;
  currency: string;
  data: WorkingCapitalData[];
  summary: {
    totalIncome: number;
    totalExpense: number;
    netBalance: number;
  };
}

export interface WorkingCapitalData {
  month: string;
  income: number;
  expense: number;
  net: number;
}

// ----------------------------------------
// 💳 Wallet & Credit Cards
// ----------------------------------------
export interface WalletCard {
  id: string;
  name: string;       // e.g. "Visa Platinum"
  bank: string;       // e.g. "Chase Bank"
  network: string;    // e.g. "Visa" | "MasterCard"
  cardNumber: string; // e.g. "4111111111111111"
  expiryMonth: number;
  expiryYear: number;
  balance: number;
  currency: string;
}

export interface WalletData {
  cards: WalletCard[];
}

// ----------------------------------------
// 🔁 Scheduled Transfers
// ----------------------------------------
export interface ScheduledTransfer {
  id: string;
  recipient: string; // e.g. "Netflix", "Spotify"
  date: string;      // e.g. "2025-10-20"
  amount: number;
  currency: string;
}

export interface ScheduledTransfersData {
  transfers: ScheduledTransfer[];
}

// ----------------------------------------
// 📜 Transactions
// ----------------------------------------
export interface Transaction {
  id: string;
  title: string; // e.g. "Grocery Shopping"
  date: string;  // e.g. "2025-10-15"
  type: "income" | "expense";
  amount: number;
  currency: string;
}

export interface TransactionsData {
  transactions: Transaction[];
}

// types/workingCapital.ts (or add to your existing types file)
export interface WorkingCapitalEntry {
  date: string;      // ISO date string e.g. "2025-10-15"
  income: number;    // numeric amount in smallest unit (or float)
  expense: number;   // numeric amount
}


// ----------------------------------------
// 🧠 Utility Union Types
// ----------------------------------------
export type Currency = "USD" | "EUR" | "GBP" | "TRY" | string;
