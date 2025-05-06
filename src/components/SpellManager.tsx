import React from 'react';
import { TextInput, Button, Stack, Table, Group, Select, NumberInput } from '@mantine/core';
import { useState } from 'react';

interface Spell {
  name: string;
  level: number;
  school: string;
  castingTime: string;
}

interface SpellManagerProps {
  spells: Spell[];
  onSpellsChange: (spells: Spell[]) => void;
}

const spellSchools = [
  'Abjuration', 'Conjuration', 'Divination', 'Enchantment',
  'Evocation', 'Illusion', 'Necromancy', 'Transmutation'
];

export const SpellManager = ({ spells, onSpellsChange }: SpellManagerProps) => {
  const [newSpell, setNewSpell] = useState<Spell>({
    name: '',
    level: 0,
    school: '',
    castingTime: '1 action'
  });

  const addSpell = () => {
    if (newSpell.name && newSpell.school) {
      onSpellsChange([...spells, newSpell]);
      setNewSpell({ name: '', level: 0, school: '', castingTime: '1 action' });
    }
  };

  const removeSpell = (index: number) => {
    onSpellsChange(spells.filter((_, i) => i !== index));
  };

  return (
    <Stack>
      <Group>
        <TextInput
          label="Spell Name"
          value={newSpell.name}
          onChange={(e) => setNewSpell({ ...newSpell, name: e.target.value })}
        />
        <NumberInput
          label="Level"
          value={newSpell.level}
          onChange={(val) => setNewSpell({ ...newSpell, level: val || 0 })}
          min={0}
          max={9}
        />
        <Select
          label="School"
          data={spellSchools}
          value={newSpell.school}
          onChange={(val) => setNewSpell({ ...newSpell, school: val || '' })}
        />
        <Button onClick={addSpell}>Add Spell</Button>
      </Group>

      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Level</th>
            <th>School</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {spells.map((spell, index) => (
            <tr key={index}>
              <td>{spell.name}</td>
              <td>{spell.level}</td>
              <td>{spell.school}</td>
              <td>
                <Button color="red" onClick={() => removeSpell(index)}>
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Stack>
  );
};