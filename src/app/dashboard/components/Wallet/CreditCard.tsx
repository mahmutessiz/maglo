import { useState } from "react";
import Image from "next/image";
import type { WalletCard } from "../../../../types/types";

export default function CreditCard({ card }: { card: WalletCard }) {
  const [imageSrc, setImageSrc] = useState(`/${card.network.toLowerCase()}.svg`);
  const [imageLoaded, setImageLoaded] = useState(false);
  const fallbackCardImage = "/maglo-logo.svg"; // Use an existing image as fallback

  const handleImageError = () => {
    setImageSrc(fallbackCardImage);
    setImageLoaded(false);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div
      style={{ background: "black" }}
      className="relative flex flex-col justify-between shadow-lg p-6 rounded-2xl h-52 text-white"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{card.name}</h3>
          <p className="opacity-80 text-xs">{card.bank}</p>
        </div>
        <div className="w-10 h-6 flex items-center justify-center">
          <Image
            src={imageSrc}
            alt={card.network}
            width={40}
            height={25}
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
        </div>
      </div>

      <div>
        <p className="font-mono text-xl tracking-wider">
          {card.cardNumber.replace(/(\d{4})/g, "$1 ").trim()}
        </p>
        <p className="opacity-80 mt-1 text-xs">
          {`0${card.expiryMonth}`.slice(-2)}/{String(card.expiryYear).slice(-2)}
        </p>
      </div>
    </div>
  );
}
