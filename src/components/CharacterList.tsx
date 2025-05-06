import React from 'react';
import { Select, Button, Group } from '@mantine/core';
import { useState, useEffect } from 'react';
import { CharacterService } from '../services/CharacterService';

interface CharacterListProps {
  onLoadCharacter: (name: string) => void;
}

export const CharacterList = ({ onLoadCharacter }: CharacterListProps) => {
  const [characters, setCharacters] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    setCharacters(CharacterService.getAllCharacters());
  }, []);

  const handleLoad = () => {
    if (selected) {
      onLoadCharacter(selected);
    }
  };

  return (
    <Group>
      <Select
        label="Load Character"
        placeholder="Select a character"
        data={characters}
        value={selected}
        onChange={setSelected}
        style={{ flex: 1 }}
      />
      <Button onClick={handleLoad} disabled={!selected}>
        Load
      </Button>
    </Group>
  );
};