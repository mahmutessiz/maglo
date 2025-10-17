import { MoreHorizontal } from "lucide-react";
import CreditCard from "./CreditCard";
import type { WalletData } from "../../../../types/types";

export default function Wallet({ data }: { data?: WalletData }) {

  return (
    <div className="bg-gradient-to-b from-white/40 to-white/10 rounded-2xl">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-[#1B212D] text-lg">Wallet</h2>
        <button className="w-[22px] h-[22px] text-[#929EAE]">
          <MoreHorizontal />
        </button>
      </div>

      <div className="relative flex flex-col items-center gap-0 mt-4">
        <CreditCard data={data} />
      </div>
    </div>
  );
}
