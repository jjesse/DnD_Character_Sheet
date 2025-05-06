import React from 'react';
import { Group, Button, Text, Paper, Stack, Select, NumberInput } from '@mantine/core';
import { useState } from 'react';

const diceTypes = ['d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100'];

export const DiceRoller = () => {
  const [selectedDice, setSelectedDice] = useState('d20');
  const [quantity, setQuantity] = useState(1);
  const [results, setResults] = useState<number[]>([]);
  const [total, setTotal] = useState<number | null>(null);

  const rollDice = () => {
    const sides = parseInt(selectedDice.substring(1));
    const rolls = Array.from({ length: quantity }, () => 
      Math.floor(Math.random() * sides) + 1
    );
    setResults(rolls);
    setTotal(rolls.reduce((sum, roll) => sum + roll, 0));
  };

  return (
    <Paper p="md">
      <Stack>
        <Group>
          <Select
            label="Dice Type"
            data={diceTypes}
            value={selectedDice}
            onChange={(val) => setSelectedDice(val || 'd20')}
          />
          <NumberInput
            label="Quantity"
            value={quantity}
            onChange={(val) => setQuantity(val || 1)}
            min={1}
            max={10}
          />
          <Button onClick={rollDice}>Roll</Button>
        </Group>
        
        {results.length > 0 && (
          <Stack spacing="xs">
            <Text>Results: {results.join(', ')}</Text>
            <Text weight={700}>Total: {total}</Text>
          </Stack>
        )}
      </Stack>
    </Paper>
  );
};