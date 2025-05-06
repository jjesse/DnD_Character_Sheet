import React from 'react';
import { Checkbox, Stack, Group, Text } from '@mantine/core';

interface SkillProficienciesProps {
  skills: Record<string, boolean>;
  onSkillsChange: (skills: Record<string, boolean>) => void;
  abilityModifiers: Record<string, number>;
}

const skillAbilityMap = {
  'Acrobatics': 'dexterity',
  'Animal Handling': 'wisdom',
  'Arcana': 'intelligence',
  'Athletics': 'strength',
  'Deception': 'charisma',
  'History': 'intelligence',
  'Insight': 'wisdom',
  'Intimidation': 'charisma',
  'Investigation': 'intelligence',
  'Medicine': 'wisdom',
  'Nature': 'intelligence',
  'Perception': 'wisdom',
  'Performance': 'charisma',
  'Persuasion': 'charisma',
  'Religion': 'intelligence',
  'Sleight of Hand': 'dexterity',
  'Stealth': 'dexterity',
  'Survival': 'wisdom'
};

export const SkillProficiencies = ({ skills, onSkillsChange, abilityModifiers }: SkillProficienciesProps) => {
  const proficiencyBonus = 2; // This should be calculated based on level

  const handleSkillToggle = (skillName: string) => {
    onSkillsChange({
      ...skills,
      [skillName]: !skills[skillName]
    });
  };

  return (
    <Stack>
      {Object.entries(skillAbilityMap).map(([skill, ability]) => {
        const isProficient = skills[skill] || false;
        const modifier = abilityModifiers[ability] || 0;
        const total = modifier + (isProficient ? proficiencyBonus : 0);

        return (
          <Group key={skill} position="apart">
            <Checkbox
              label={skill}
              checked={isProficient}
              onChange={() => handleSkillToggle(skill)}
            />
            <Text size="sm">
              {ability.charAt(0).toUpperCase()} {total >= 0 ? '+' : ''}{total}
            </Text>
          </Group>
        );
      })}
    </Stack>
  );
};