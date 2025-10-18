'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col justify-center items-center bg-white w-full min-h-screen">
      <div className="flex justify-center items-center gap-4">
        <div className="flex justify-center items-center animate-pulse">
          <Image src="/maglo-logo.svg" alt="Logo" width={52} height={52} />
        </div>
        
        <h1 className="font-bold text-4xl animate-pulse">
          Maglo.
        </h1>
        
      </div>
        <br />
      <p className="text-gray-500 animate-pulse">
          Redirecting...
        </p>
    </div>
  );
}
