export const calculateModifier = (score: number): number => {
  return Math.floor((score - 10) / 2);
};

export const calculateProficiencyBonus = (level: number): number => {
  return Math.floor((level - 1) / 4) + 2;
};

export const calculateTotalWeight = (equipment: Array<{ weight: number; quantity: number }>): number => {
  return equipment.reduce((total, item) => total + (item.weight * item.quantity), 0);
};