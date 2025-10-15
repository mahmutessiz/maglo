import { MoreHorizontal } from "lucide-react";
import CreditCard from "./CreditCard";
import type { WalletData } from "../../../../types/types";

export default function Wallet({ data }: { data?: WalletData }) {
  return (
    <div className="bg-white shadow-sm p-6 border border-gray-200 rounded-2xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-gray-800 text-xl">Wallet</h2>
        <button className="text-gray-500">
          <MoreHorizontal />
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {data?.cards.map((card) => (
          <CreditCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}
