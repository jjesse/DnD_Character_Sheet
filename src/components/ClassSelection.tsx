import React from 'react';
import { Select, Text, Stack, List, Paper } from '@mantine/core';
import { useState } from 'react';

const classDetails = {
  Barbarian: {
    features: ['Rage', 'Unarmored Defense'],
    equipment: ['Greataxe', 'Two handaxes', 'Explorer\'s pack', '4 javelins'],
    hitDie: 'd12',
    primaryAbility: 'Strength'
  },
  Bard: {
    features: ['Spellcasting', 'Bardic Inspiration'],
    equipment: ['Rapier', 'Diplomat\'s pack', 'Lute', 'Leather armor'],
    hitDie: 'd8',
    primaryAbility: 'Charisma'
  },
  // ...add other classes...
};

interface ClassSelectionProps {
  value: string;
  onChange: (value: string) => void;
  onEquipmentChange?: (equipment: string[]) => void;
}

export const ClassSelection = ({ value, onChange, onEquipmentChange }: ClassSelectionProps) => {
  const selectedClass = value ? classDetails[value as keyof typeof classDetails] : null;

  const handleClassChange = (newClass: string) => {
    onChange(newClass);
    if (onEquipmentChange && classDetails[newClass as keyof typeof classDetails]) {
      onEquipmentChange(classDetails[newClass as keyof typeof classDetails].equipment);
    }
  };

  return (
    <Stack spacing="md">
      <Select
        label="Character Class"
        data={Object.keys(classDetails)}
        value={value}
        onChange={handleClassChange}
      />
      
      {selectedClass && (
        <Paper p="md" withBorder>
          <Stack spacing="xs">
            <Text weight={700}>Class Features:</Text>
            <List>
              {selectedClass.features.map((feature, index) => (
                <List.Item key={index}>{feature}</List.Item>
              ))}
            </List>
            
            <Text weight={700} mt="sm">Starting Equipment:</Text>
            <List>
              {selectedClass.equipment.map((item, index) => (
                <List.Item key={index}>{item}</List.Item>
              ))}
            </List>
            
            <Text size="sm" color="dimmed">
              Hit Die: {selectedClass.hitDie} • Primary Ability: {selectedClass.primaryAbility}
            </Text>
          </Stack>
        </Paper>
      )}
    </Stack>
  );
};