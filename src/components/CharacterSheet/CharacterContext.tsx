import { createContext, useContext, ReactNode } from 'react';
import { Character } from './types';

interface CharacterContextType {
  character: Character | null;
  updateCharacter: (updates: Partial<Character>) => void;
  saveCharacter: () => Promise<void>;
  loadCharacter: (id: string) => Promise<void>;
}

const CharacterContext = createContext<CharacterContextType | null>(null);

export const useCharacter = () => {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error('useCharacter must be used within a CharacterProvider');
  }
  return context;
};

interface CharacterProviderProps {
  children: ReactNode;
}

export const CharacterProvider = ({ children }: CharacterProviderProps) => {
  // Implementation will connect with CharacterService
  const value: CharacterContextType = {
    character: null,
    updateCharacter: () => {},
    saveCharacter: async () => {},
    loadCharacter: async () => {},
  };

  return (
    <CharacterContext.Provider value={value}>
      {children}
    </CharacterContext.Provider>
  );
};