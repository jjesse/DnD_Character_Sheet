import { Stack, SegmentedControl, Button, Group, Text, NumberInput } from '@mantine/core';
import { useState } from 'react';

interface AbilityScores {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

interface AbilityScoreCalculatorProps {
  scores: AbilityScores;
  onScoresChange: (scores: AbilityScores) => void;
}

const STANDARD_ARRAY = [15, 14, 13, 12, 10, 8];
const POINT_BUY_COSTS = {
  8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9
};

export const AbilityScoreCalculator = ({ scores, onScoresChange }: AbilityScoreCalculatorProps) => {
  const [method, setMethod] = useState<'manual' | 'standard' | 'pointbuy'>('manual');
  const [remainingPoints, setRemainingPoints] = useState(27);
  const [standardArrayUsed, setStandardArrayUsed] = useState<number[]>([]);

  const applyStandardArray = (ability: keyof AbilityScores, value: number) => {
    if (!standardArrayUsed.includes(value)) {
      setStandardArrayUsed([...standardArrayUsed, value]);
      onScoresChange({ ...scores, [ability]: value });
    }
  };

  const calculatePointBuyCost = (score: number) => {
    return POINT_BUY_COSTS[score as keyof typeof POINT_BUY_COSTS] || 0;
  };

  const handlePointBuy = (ability: keyof AbilityScores, value: number) => {
    const oldCost = calculatePointBuyCost(scores[ability]);
    const newCost = calculatePointBuyCost(value);
    const pointDiff = newCost - oldCost;
    
    if (remainingPoints - pointDiff >= 0) {
      setRemainingPoints(remainingPoints - pointDiff);
      onScoresChange({ ...scores, [ability]: value });
    }
  };

  return (
    <Stack>
      <SegmentedControl
        value={method}
        onChange={(value: 'manual' | 'standard' | 'pointbuy') => setMethod(value)}
        data={[
          { label: 'Manual', value: 'manual' },
          { label: 'Standard Array', value: 'standard' },
          { label: 'Point Buy', value: 'pointbuy' }
        ]}
      />

      {method === 'pointbuy' && (
        <Text>Points Remaining: {remainingPoints}</Text>
      )}

      {Object.entries(scores).map(([ability, score]) => (
        <Group key={ability}>
          <Text style={{ width: 100 }}>{ability.charAt(0).toUpperCase() + ability.slice(1)}:</Text>
          {method === 'standard' ? (
            <SegmentedControl
              value={score.toString()}
              onChange={(value) => applyStandardArray(ability as keyof AbilityScores, parseInt(value))}
              data={STANDARD_ARRAY.map(n => ({ label: n.toString(), value: n.toString() }))}
              disabled={standardArrayUsed.includes(score)}
            />
          ) : (
            <NumberInput
              value={score}
              onChange={(value) => {
                if (method === 'pointbuy') {
                  handlePointBuy(ability as keyof AbilityScores, value || 8);
                } else {
                  onScoresChange({ ...scores, [ability]: value || 8 });
                }
              }}
              min={8}
              max={method === 'pointbuy' ? 15 : 20}
            />
          )}
        </Group>
      ))}

      {method === 'standard' && (
        <Button onClick={() => {
          setStandardArrayUsed([]);
          onScoresChange({
            strength: 8, dexterity: 8, constitution: 8,
            intelligence: 8, wisdom: 8, charisma: 8
          });
        }}>
          Reset Standard Array
        </Button>
      )}
    </Stack>
  );
};