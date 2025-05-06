import { createContext, useContext, ReactNode, useState } from 'react';

interface Profile {
  username: string;
  email: string;
  preferences: UserPreferences;
  securitySettings: SecuritySettings;
}

interface ProfileContextType {
  profile: Profile | null;
  updateProfile: (updates: Partial<Profile>) => void;
  saveProfile: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | null>(null);

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<Profile | null>(null);

  const value: ProfileContextType = {
    profile,
    updateProfile: (updates) => {
      setProfile(prev => prev ? { ...prev, ...updates } : null);
    },
    saveProfile: async () => {
      // Implementation will connect with AuthService
    }
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};