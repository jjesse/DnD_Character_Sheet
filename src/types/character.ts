export interface Character {
  id?: string;
  name: string;
  race: string;
  class: string;
  level: number;
  abilities: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  hitPoints: {
    current: number;
    maximum: number;
  };
  skills: Record<string, boolean>;
  equipment: Array<{
    name: string;
    quantity: number;
    weight: number;
    description: string;
  }>;
  spells: Array<{
    name: string;
    level: number;
    school: string;
    castingTime: string;
  }>;
  portrait?: string;
  experience: number;
  proficiencyBonus: number;
  lastSaved?: string;
}