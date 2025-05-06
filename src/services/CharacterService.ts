import { Character } from '../types/character';
import { AuthService } from './AuthService';

interface SavedCharacter extends Character {
  lastModified: string;
  userId: string;
}

export class CharacterService {
  private static getKey(name: string): string {
    const user = AuthService.getCurrentUser();
    if (!user) throw new Error('User must be logged in');
    return `character-${user.id}-${name}`;
  }

  static saveCharacter(character: Character): void {
    if (!AuthService.isAuthenticated()) {
      throw new Error('User must be logged in');
    }
    if (!character.name) {
      throw new Error('Character name is required');
    }
    
    const timestamp = new Date().toISOString();
    const userId = AuthService.getCurrentUser()?.id;
    if (!userId) throw new Error('User ID not found');

    const key = this.getKey(character.name);
    const data: SavedCharacter = {
      ...character,
      lastModified: timestamp,
      userId
    };
    
    localStorage.setItem(key, JSON.stringify(data));
  }

  static loadCharacter(name: string): Character | null {
    try {
      const data = localStorage.getItem(this.getKey(name));
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error loading character:', error);
      return null;
    }
  }

  static deleteCharacter(name: string): void {
    try {
      localStorage.removeItem(this.getKey(name));
    } catch (error) {
      console.error('Error deleting character:', error);
    }
  }

  static getAllCharacters(): string[] {
    const user = AuthService.getCurrentUser();
    if (!user) return [];

    try {
      return Object.keys(localStorage)
        .filter(key => key.startsWith(`character-${user.id}-`))
        .map(key => key.replace(`character-${user.id}-`, ''))
        .sort((a, b) => {
          const aData = JSON.parse(localStorage.getItem(this.getKey(a)) || '{}');
          const bData = JSON.parse(localStorage.getItem(this.getKey(b)) || '{}');
          return (bData.lastModified || '').localeCompare(aData.lastModified || '');
        });
    } catch (error) {
      console.error('Error getting characters:', error);
      return [];
    }
  }
}