import React from "react";
import Image from "next/image";
export default function StatCard({
  title,
  amount,
  icon,
  bgColor,
  textColor,
  titleColor,
  iconBgColor,
}: {
  title: string;
  amount: string;
  icon: string;
  bgColor?: string;
  textColor?: string;
  titleColor?: string;
  iconBgColor?: string;
  currency?: string;
}) {
  return (
    <div className={"flex justify-center items-center py-[24px] w-full px-[20px] rounded-[10px]" + ` ${bgColor}`}>
      <div className={"w-[42px] h-[42px] mr-[15px] flex items-center justify-center rounded-full" + ` ${iconBgColor}`}>
        <Image src={icon} alt={title} width={20} height={20} className="w-5 h-5" />
      </div>
      <div className="flex flex-col justify-center items-start gap-2.5 min-w-[125px]">
        <p className={"text-sm" + ` ${titleColor}`}>{title}</p>
        <p className={"font-bold text-2xl"+ ` ${textColor}`}>{amount}</p>
      </div>
    </div>
  );
}
