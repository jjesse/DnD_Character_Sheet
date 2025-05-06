import { Table, Title, Text, Stack, Select } from '@mantine/core';
import { SPELL_SCHOOLS } from './constants';

interface Spell {
  name: string;
  level: number;
  school: string;
  castingTime: string;
}

interface SpellListProps {
  spells: Spell[];
  onSpellChange: (spells: Spell[]) => void;
}

export const SpellList = ({ spells, onSpellChange }: SpellListProps) => {
  return (
    <Stack>
      <Title order={3}>Spells</Title>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Level</th>
            <th>School</th>
            <th>Casting Time</th>
          </tr>
        </thead>
        <tbody>
          {spells.map((spell, index) => (
            <tr key={index}>
              <td>{spell.name}</td>
              <td>{spell.level}</td>
              <td>{spell.school}</td>
              <td>{spell.castingTime}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Stack>
  );
};