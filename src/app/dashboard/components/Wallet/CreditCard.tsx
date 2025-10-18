"use client";

import Image from "next/image";
import type { WalletCard } from "../../../../types/types";


export default function CreditCard({ data }: { data?: { cards: WalletCard[] } }) {

  const cardImages = {
    visa: "/visa.svg",
    mastercard: "/mastercard-logo.svg",
    chip: "/chip.png",
    wifi: "/wifi.svg",
  };

  // If no data is provided, return empty fragment
  if (!data || !data.cards || data.cards.length === 0) {
    return <div className="py-8 text-gray-500 text-center">No cards available</div>;
  }

  // Get the first card as the primary card (or default if available)
  const primaryCard = data.cards.find(card => card.isDefault) || data.cards[0];
  const secondaryCard = data.cards.length > 1 && data.cards.find(card => card.id !== primaryCard.id) ? 
    data.cards.find(card => card.id !== primaryCard.id) : null;


  return (
    <>
      {/* Primary Card */}
      {primaryCard && (
        <div
          key={primaryCard.id}
          className="hover:z-50 px-[30px] py-4 rounded-[15px] w-full max-w-[354px] h-[210px] hover:scale-105 transition-transform duration-300 ease-in-out"
          style={{
            background: "linear-gradient(104.3deg, #4A4A49 2.66%, #20201F 90.57%)",
          }}
        >
          <div className="flex flex-col justify-between gap-4">
            {/* Top Section */}
            <div className="flex items-center gap-1">
              <p className="font-bold text-[16px] text-white">Maglo.</p>
              <p className="text-[#626260]">|</p>
              <p className="text-[#626260] text-[12px]">
                {" "}
                {primaryCard.bank.split("|")[1]?.trim() || primaryCard.bank}
              </p>
            </div>
            {/* Middle Section */}
            <div className="flex justify-between">
              <Image
                src={cardImages.chip}
                alt="Chip"
                className="w-[38px] h-[30px]"
                width={38}
                height={30}
              />
              <Image
                src={cardImages.wifi}
                alt="Wifi"
                className="w-[33px] h-[34px]"
                width={33}
                height={34}
              />
            </div>
            {/* Bottom Section - Card Number */}
            <div className="flex">
              <p className="font-bold text-[17px] text-white">
                {primaryCard.cardNumber}
              </p>
            </div>
            {/* Bottom logo and expiry section */}
            <div className="flex justify-between items-center py-2">
              <p className="text-[#868685] text-[14px]">
                {`0${primaryCard.expiryMonth}`.slice(-2)}/{String(primaryCard.expiryYear).slice(-2)}
              </p>
              <Image
                src={cardImages.mastercard}
                alt={primaryCard.network}
                className="w-[38px] h-[30px]"
                width={38}
                height={30}
              />
            </div>
          </div>
        </div>
      )}

      {/* Secondary Card */}
      {secondaryCard && (
        <div 
          key={secondaryCard.id}
          className="bg-gradient-to-b from-gray-200/40 to-gray-300/10 backdrop-blur-sm -mt-16 px-[30px] py-4 rounded-[15px] w-[90%] max-w-[324px] h-[172px] hover:scale-105 transition-transform duration-300 ease-in-out"
        >
          <div className="flex flex-col gap-2">
            {/* Top Section */}
            <div className="flex items-center gap-1">
              <p className="font-bold text-[16px] text-white">Maglo.</p>
              <p className="text-white">|</p>
              <p className="text-[12px] text-white">
                {" "}
                {secondaryCard.bank.split("|")[1]?.trim() || secondaryCard.bank}
              </p>
            </div>
            {/* Middle Section */}
            <div className="flex justify-between">
              <Image
                src={cardImages.chip}
                alt="Chip"
                className="w-[38px] h-[30px]"
                width={38}
                height={30}
              />
              <Image
                src={cardImages.wifi}
                alt="Wifi"
                className="w-[33px] h-[34px]"
                width={33}
                height={34}
              />
            </div>
            {/* Bottom Section - Card Number */}
            <div className="flex">
              <p className="font-bold text-[17px] text-black">
                {secondaryCard.cardNumber}
              </p>
            </div>
            {/* Bottom logo and expiry section */}
            <div className="flex justify-between items-center py-2">
              <p className="text-[#868685] text-[14px]">
                {`0${secondaryCard.expiryMonth}`.slice(-2)}/{String(secondaryCard.expiryYear).slice(-2)}
              </p>
              <Image
                src={cardImages.visa}
                alt={secondaryCard.network}
                className="w-[38px] h-[30px]"
                width={38}
                height={30}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

