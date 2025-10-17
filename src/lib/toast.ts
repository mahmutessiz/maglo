import toast from 'react-hot-toast';
import type { Toast } from 'react-hot-toast';

type ToastType = 'success' | 'error' | 'loading' | 'custom';

interface ToastOptions {
  duration?: number;
  position?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';
  icon?: string | React.ReactNode;
}

const baseStyle = {
  background: '#363636',
  color: '#fff',
  padding: '16px',
  borderRadius: '8px',
  fontSize: '14px',
} as const;

const styles = {
  success: {
    ...baseStyle,
    background: '#10b981',
  },
  error: {
    ...baseStyle,
    background: '#ef4444',
  },
  loading: {
    ...baseStyle,
    background: '#3b82f6',
  },
  custom: baseStyle,
} as const;

const getDefaultIcon = (type: ToastType): string | undefined => {
  switch (type) {
    case 'success':
      return '✓';
    case 'error':
      return '✕';
    case 'loading':
      return '⟳';
    default:
      return undefined;
  }
};

export const showToast = (
  message: string,
  type: ToastType = 'custom',
  options: ToastOptions = {}
): string => {
  const { duration = 4000, position = 'bottom-right', icon } = options;

  const toastConfig = {
    duration,
    position: position as 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right',
    style: styles[type],
    icon: icon || getDefaultIcon(type),
  };

  switch (type) {
    case 'success':
      return toast.success(message, toastConfig);
    case 'error':
      return toast.error(message, toastConfig);
    case 'loading':
      return toast.loading(message, toastConfig);
    default:
      return toast(message, toastConfig);
  }
};

export const toastSuccess = (
  message: string,
  options?: ToastOptions
): string => showToast(message, 'success', options);

export const toastError = (
  message: string,
  options?: ToastOptions
): string => showToast(message, 'error', options);

export const toastLoading = (
  message: string,
  options?: ToastOptions
): string => showToast(message, 'loading', options);

export const toastCustom = (
  message: string,
  options?: ToastOptions
): string => showToast(message, 'custom', options);