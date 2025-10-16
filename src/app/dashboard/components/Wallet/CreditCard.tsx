// import { useState } from "react";
// import Image from "next/image";
// import type { WalletCard } from "../../../../types/types";

// export default function CreditCard({ card }: { card: WalletCard }) {
//   const [imageSrc, setImageSrc] = useState(`/${card.network.toLowerCase()}.svg`);
//   const [imageLoaded, setImageLoaded] = useState(false);
//   const fallbackCardImage = "/maglo-logo.svg"; // Use an existing image as fallback

//   const handleImageError = () => {
//     setImageSrc(fallbackCardImage);
//     setImageLoaded(false);
//   };

//   const handleImageLoad = () => {
//     setImageLoaded(true);
//   };

//    const cardImages= {
//     visa: "/visa.svg",
//     mastercard: "/mastercard-logo.svg",
//     chip: "/chip.png",
//     wifi: "/wifi.svg",
//   };

//   return (
//     <div
//       style={{ background: "black" }}
//       className="relative flex flex-col justify-between shadow-lg p-6 rounded-2xl h-52 text-white"
//     >
//       <div className="flex justify-between items-start">
//         <div>
//           <h3 className="font-semibold">{card.name}</h3>
//           <p className="opacity-80 text-xs">{card.bank}</p>
//         </div>
//         <div className="flex justify-center items-center w-10 h-6">
//           <Image
//             src={imageSrc}
//             alt={card.network}
//             width={40}
//             height={25}
//             onError={handleImageError}
//             onLoad={handleImageLoad}
//           />
//         </div>
//       </div>

//       <div>
//         <p className="font-mono text-xl tracking-wider">
//           {card.cardNumber.replace(/(\d{4})/g, "$1 ").trim()}
//         </p>
//         <p className="opacity-80 mt-1 text-xs">
//           {`0${card.expiryMonth}`.slice(-2)}/{String(card.expiryYear).slice(-2)}
//         </p>
//       </div>
//     </div>
//   );
// }

"use client";

import Image from "next/image";
import type { WalletCard } from "../../../../types/types";

export default function CreditCard() {
  const cardImages = {
    visa: "/visa.svg",
    mastercard: "/mastercard-logo.svg",
    chip: "/chip.png",
    wifi: "/wifi.svg",
  };
  // console.log(card);
  // const isDefault = card.isDefault;
  const cardData1 = {
    bank: "Maglo | Universal Bank",
    cardNumber: "5495 7381 3759 2321",
    color: "#000000",
    expiryMonth: 12,
    expiryYear: 2027,
    id: "card_001",
    isDefault: true,
    name: "Maglo Gold Card",
    network: "Visa",
    type: "credit",
  };
  const cardData2 = {
    id: "card_002",
    name: "Commercial Bank Platinum",
    type: "credit",
    cardNumber: "8595 2548 ****",
    bank: "Maglo | Commercial Bank",
    network: "Visa",
    expiryMonth: 9,
    expiryYear: 2025,
    color: "#FFFFFF",
    isDefault: false,
  };
  return (
    <>
      {/* Card 1 */}
      <div
        className="px-[30px] py-4 rounded-[15px] w-full max-w-[354px] h-[210px]"
        style={{
          background:
            "linear-gradient(104.3deg, #4A4A49 2.66%, #20201F 90.57%)",
        }}
      >
        <div className="flex flex-col justify-between gap-4">
          {/* Top Section */}
          <div className="flex items-center gap-1">
            <p className="font-bold text-[16px] text-white">Maglo.</p>
            <p className="text-[#626260]">|</p>
            <p className="text-[#626260] text-[12px]">
              {" "}
              {cardData1.bank.split("|")[1]}
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
          {/* Bottom Section */}
          <div className="flex">
            <p className="font-bold text-[17px] text-white">
              {cardData1.cardNumber}
            </p>
          </div>
          {/* Bottom logo and expiry section */}
          <div className="flex justify-between items-center py-2">
            <p className="text-[#868685] text-[14px]">
              {`0${cardData1.expiryMonth}`.slice(-2)}/
              {String(cardData1.expiryYear).slice(-2)}
            </p>
            <Image
              src={cardImages.mastercard}
              alt="Visa"
              className="w-[38px] h-[30px]"
              width={38}
              height={30}
            />
          </div>
        </div>
      </div>
      {/* Card 2 */}
      <div className="bg-gradient-to-b from-gray-200/40 to-gray-300/10 backdrop-blur-sm -mt-16 px-[30px] py-4 rounded-[15px] w-[90%] max-w-[324px] h-[172px]">
        <div className="flex flex-col gap-2"
          style={{
            width: "290",
            height: "137",
            top: "202px",
            left: "35px",
            opacity: "1",
          }}
        >
          {/* Top Section */}
          <div className="flex items-center gap-1">
            <p className="font-bold text-[16px] text-white">Maglo.</p>
            <p className="text-white">|</p>
            <p className="text-[12px] text-white">
              {" "}
              {cardData2.bank.split("|")[1]}
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
          {/* Bottom Section */}
          <div className="flex">
            <p className="font-bold text-[17px] text-black">
              {cardData1.cardNumber}
            </p>
          </div>
          {/* Bottom logo and expiry section */}
          <div className="flex justify-between items-center py-2">
            <p className="text-[#868685] text-[14px]">
              {`0${cardData1.expiryMonth}`.slice(-2)}/
              {String(cardData1.expiryYear).slice(-2)}
            </p>
            <Image
              src={cardImages.visa}
              alt="Visa"
              className="w-[38px] h-[30px]"
              width={38}
              height={30}
            />
          </div>
        </div>
      </div>
    </>
  );
}

// <div
//   className={`relative flex flex-col justify-between rounded-2xl p-5 w-full h-48 text-white transition-all duration-300 shadow-md border
//   ${isDefault ? "bg-black " : "bg-gray-100 border-gray-200 text-gray-900"}`}
// >
//   {/* Top Section */}
//   <div className="flex justify-between items-start">
//     <div>
//       <h3 className="font-semibold text-base">{card.name.split(" ")[0]}.</h3>
//       <p
//         className={`text-xs ${
//           isDefault ? "text-gray-300" : "text-gray-600"
//         }`}
//       >
//         {card.bank}
//       </p>
//     </div>

//     {/* Network Logo */}
//     <div className="flex justify-center items-center w-10 h-6">
//       <Image
//         src={
//           card.network.toLowerCase() === "visa"
//             ? cardImages.visa
//             : cardImages.mastercard
//         }
//         alt={card.network}
//         width={40}
//         height={25}
//       />
//     </div>
//   </div>

//   {/* Middle Section (Chip + WiFi) */}
//   <div className="flex items-center gap-2">
//     <Image
//       src={cardImages.chip}
//       alt="Chip"
//       width={40}
//       height={25}
//       className={isDefault ? "brightness-200" : ""}
//     />
//     <Image
//       src={cardImages.wifi}
//       alt="WiFi"
//       width={20}
//       height={20}
//       className={isDefault ? "invert" : ""}
//     />
//   </div>

//   {/* Bottom Section */}
//   <div>
//     <p
//       className={`font-mono text-xl tracking-widest ${
//         isDefault ? "text-white" : "text-gray-900"
//       }`}
//     >
//       {isDefault
//         ? card.cardNumber
//         : card.cardNumber.slice(0, 8) + "*****"}
//     </p>
//     <p
//       className={`text-xs mt-1 ${
//         isDefault ? "text-gray-400" : "text-gray-600"
//       }`}
//     >
//       {`0${card.expiryMonth}`.slice(-2)}/{String(card.expiryYear).slice(-2)}
//     </p>
//   </div>
// </div>
