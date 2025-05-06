import { useState } from 'react';

type LoadingStates = {
  [key: string]: boolean;
};

export const useProfileLoading = () => {
  const [loadingStates, setLoadingStates] = useState<LoadingStates>({});

  const withLoading = async <T>(key: string, operation: () => Promise<T>): Promise<T> => {
    setLoadingStates(prev => ({ ...prev, [key]: true }));
    try {
      const result = await operation();
      return result;
    } finally {
      setLoadingStates(prev => ({ ...prev, [key]: false }));
    }
  };

  const isLoading = (key: string): boolean => {
    return loadingStates[key] || false;
  };

  return {
    withLoading,
    isLoading
  };
};