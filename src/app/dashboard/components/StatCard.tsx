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
    <div 
      aria-label={`Financial stat: ${title}`}
      className={`flex justify-center items-center py-[24px] w-full px-[20px] rounded-[10px] ${bgColor} hover:scale-105 transition duration-200 ease-in-out`}
    >
      <div className={"w-[42px] h-[42px] mr-[15px] flex items-center justify-center rounded-full" + ` ${iconBgColor}`} aria-hidden="true">
        <Image src={icon} alt="wallet icon" width={20} height={20} className="w-5 h-5" />
      </div>
      <div className="flex flex-col justify-center items-start gap-2.5 min-w-[125px]">
        <p className={"text-sm" + ` ${titleColor}`} aria-label={title}>{title}</p>
        <p className={"font-bold text-2xl"+ ` ${textColor}`} aria-label={`Amount: ${amount}`}>{amount}</p>
      </div>
    </div>
  );
}