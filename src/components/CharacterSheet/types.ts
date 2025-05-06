export interface CharacterSheetProps {
  onSave?: () => void;
  onLoad?: () => void;
}

export interface Character {
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
}