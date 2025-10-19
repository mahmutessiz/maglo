export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  role: "user" | "admin";
  isActive: boolean;
  createdAt: string;
}

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

export interface WalletCard {
  id: string;
  name: string;       
  bank: string;       
  network: string;   
  cardNumber: string; 
  expiryMonth: number;
  expiryYear: number;
  balance: number;
  currency: string;
  isDefault: boolean;
}

export interface WalletData {
  cards: WalletCard[];
}


export interface ScheduledTransfer {
  id: string;
  recipient: string; 
  date: string;     
  amount: number;
  currency: string;
  image: string;
  name: string;
}

export interface ScheduledTransfersData {
  transfers: ScheduledTransfer[];
}


export interface Transaction {
  id: string;
  title: string; 
  date: string;  
  type: "income" | "expense";
  amount: number;
  currency: string;
  image: string;
  business: string;
  name: string;
}

export interface TransactionsData {
  transactions: Transaction[];
}


export interface WorkingCapitalEntry {
  date: string;  
  income: number;   
  expense: number;   
}



export type Currency = "USD" | "EUR" | "GBP" | "TRY" | string;

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
  isActive: boolean;
  lastLoginAt: string;
  lastLoginIP: string;
  createdAt: string;
  updatedAt: string;
}

export type LoginResponse = {
  success: boolean;
  message: string;
  data: {
    user: User;
    accessToken: string;
  };
};

export type SignupResponse = {
  success: boolean;
  message: string;
  data: {
    user: User;
    accessToken: string;
  };
};