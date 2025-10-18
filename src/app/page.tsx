'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuthStore } from '@/stores/authStore';

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, _hasHydrated } = useAuthStore();

  useEffect(() => {
    // Check if user is authenticated immediately when hydration is complete
    if (_hasHydrated) {
      if (isAuthenticated) {
        router.push('/dashboard');
      } else {
        // If not authenticated, redirect to login page after 3 seconds
        const timer = setTimeout(() => {
          router.push('/login');
        }, 3000);

        // Cleanup the timer if the component unmounts
        return () => clearTimeout(timer);
      }
    }
  }, [isAuthenticated, _hasHydrated, router]);

  // Show the logo and name with pulse animation while checking auth status
  // If auth is already hydrated and user is authenticated, they'll be redirected immediately
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
          { !_hasHydrated ? 'Loading...' : (isAuthenticated ? 'Redirecting...' : 'Redirecting...') }
      </p>
    </div>
  );
}