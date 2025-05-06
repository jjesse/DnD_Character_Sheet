import { useState } from 'react';
import { UserProfile } from '../types';

export const useProfileErrors = () => {
  const [errors, setErrors] = useState<string[]>([]);

  const validateProfile = (profile: Partial<UserProfile>): boolean => {
    const newErrors: string[] = [];

    if (!profile.displayName?.trim()) {
      newErrors.push('Display name is required');
    }

    if (!profile.email?.trim()) {
      newErrors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
      newErrors.push('Invalid email format');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const clearErrors = () => {
    setErrors([]);
  };

  return {
    errors,
    validateProfile,
    clearErrors
  };
};