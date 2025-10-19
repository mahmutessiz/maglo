import { MoreHorizontal } from "lucide-react";
import CreditCard from "./CreditCard";
import type { WalletData } from "../../../../types/types";
import WalletSkeleton from "../skeletons/WalletSkeleton";

export default function Wallet({ data, isLoading }: { data?: WalletData, isLoading?: boolean }) {
if(isLoading){
  return (
  <div className="self-center bg-gradient-to-b from-white/40 to-white/10 rounded-2xl">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-[#1B212D] text-lg">Wallet</h2>
        <button className="w-[22px] h-[22px] text-[#929EAE]">
          <MoreHorizontal />
        </button>
      </div>

      <div className="relative flex flex-col items-center gap-0 mt-4">
        <WalletSkeleton />
      </div>
    </div>)
}
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
