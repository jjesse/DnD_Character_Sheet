import { Character } from '../types/character';

export class ValidationService {
  static validateCharacter(character: Character): string[] {
    const errors: string[] = [];

    if (!character.name) errors.push('Character name is required');
    if (!character.race) errors.push('Race is required');
    if (!character.class) errors.push('Class is required');
    if (character.level < 1 || character.level > 20) errors.push('Level must be between 1 and 20');

    Object.entries(character.abilities).forEach(([ability, score]) => {
      if (score < 3 || score > 20) {
        errors.push(`${ability} must be between 3 and 20`);
      }
    });

    return errors;
  }
}