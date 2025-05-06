import React from 'react';
import { Button, Group, TextInput, Stack, Text } from '@mantine/core';
import { useState } from 'react';
import { Character } from '../types/character';

interface CharacterSharingProps {
  character: Character;
  onImport: (character: Character) => void;
}

export const CharacterSharing = ({ character, onImport }: CharacterSharingProps) => {
  const [shareCode, setShareCode] = useState('');
  const [importCode, setImportCode] = useState('');

  const generateShareCode = () => {
    const code = btoa(JSON.stringify(character));
    setShareCode(code);
  };

  const importCharacter = () => {
    try {
      const importedCharacter = JSON.parse(atob(importCode));
      onImport(importedCharacter);
      setImportCode('');
    } catch (error) {
      alert('Invalid share code. Please check and try again.');
    }
  };

  return (
    <Stack>
      <Group>
        <Button onClick={generateShareCode}>Generate Share Code</Button>
        {shareCode && (
          <TextInput
            value={shareCode}
            readOnly
            style={{ flex: 1 }}
            rightSection={
              <Button
                onClick={() => navigator.clipboard.writeText(shareCode)}
                size="xs"
              >
                Copy
              </Button>
            }
          />
        )}
      </Group>

      <Group>
        <TextInput
          placeholder="Paste share code here"
          value={importCode}
          onChange={(e) => setImportCode(e.target.value)}
          style={{ flex: 1 }}
        />
        <Button onClick={importCharacter} disabled={!importCode}>
          Import Character
        </Button>
      </Group>
    </Stack>
  );
};