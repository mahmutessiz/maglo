import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';

export const useAuthRedirect = () => {
  const router = useRouter();
  const { isAuthenticated, _hasHydrated } = useAuthStore();

  useEffect(() => {
    // Wait for auth state to be hydrated before redirecting
    if (_hasHydrated) {
      if (isAuthenticated) {
        // Redirect to dashboard if user is already authenticated
        router.push('/dashboard');
      }
    }
  }, [isAuthenticated, _hasHydrated, router]);

  return { isAuthenticated, _hasHydrated };
};