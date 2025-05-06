import { Character } from '../types/character';

export class BackupService {
  static createBackup(): string {
    const characters = Object.entries(localStorage)
      .filter(([key]) => key.startsWith('character-'))
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {} as Record<string, string>);

    const backup = {
      timestamp: new Date().toISOString(),
      characters
    };

    return JSON.stringify(backup);
  }

  static restoreBackup(backupData: string): boolean {
    try {
      const backup = JSON.parse(backupData);
      Object.entries(backup.characters).forEach(([key, value]) => {
        localStorage.setItem(key, value as string);
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}