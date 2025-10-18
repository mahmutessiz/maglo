"use client";

import { useEffect, useState } from "react";
import type { UserProfile } from "../../../types/types";
import HeaderDesktop from "./Desktop/HeaderDesktop";
import HeaderMobile from "./mobile/HeaderMobile";
import HeaderDesktopSkeleton from "./skeletons/HeaderSkeleton";

export default function Header({
  user,
  isLoading,
}: {
  user?: UserProfile;
  isLoading?: boolean;
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isLoading) {
    return <HeaderDesktopSkeleton />;
  }
  return isMobile ? (
    <HeaderMobile user={user} />
  ) : (
    <HeaderDesktop user={user} />
  );
}
