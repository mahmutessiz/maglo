"use client";

import { useEffect, useState } from "react";
import type { TransactionsData } from "../../../types/types";
import RecentTransactionsMobile from "./mobile/RecentTransactionsMobile";
import DesktopRecentTransactions from "./Desktop/RecentTransactionsDesktop"; // renamed original logic

export default function RecentTransactions({ data }: { data?: TransactionsData }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return isMobile ? (
    <RecentTransactionsMobile data={data} />
  ) : (
    <DesktopRecentTransactions data={data} />
  );
}
