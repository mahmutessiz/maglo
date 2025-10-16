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
}) {
  return (
    <div className={"flex items-center space-x-4  p-6  rounded-[10px]" + ` ${bgColor}`}>
      <div className={"p-3 rounded-full" + ` ${iconBgColor}`}>
        <Image src={icon} alt={title} width={20} height={20} className="w-5 h-5" />
      </div>
      <div>
        <p className={"text-sm" + ` ${titleColor}`}>{title}</p>
        <p className={"font-bold text-2xl"+ ` ${textColor}`}>{amount}</p>
      </div>
    </div>
  );
}
