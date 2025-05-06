import { Grid, Paper, Text, Title } from '@mantine/core';
import { ABILITIES } from './constants';
import { calculateModifier } from './utils';
import { useStyles } from './styles';

interface AbilityScoresProps {
  scores: Record<string, number>;
  onChange: (ability: string, value: number) => void;
}

export const AbilityScores = ({ scores, onChange }: AbilityScoresProps) => {
  const { classes } = useStyles();

  return (
    <Grid className={classes.gridContainer}>
      {ABILITIES.map(ability => (
        <Grid.Col key={ability} span={4}>
          <Paper className={classes.abilityScore}>
            <Title order={3}>{ability}</Title>
            <Text size="xl">{scores[ability]}</Text>
            <Text size="sm">Modifier: {calculateModifier(scores[ability])}</Text>
          </Paper>
        </Grid.Col>
      ))}
    </Grid>
  );
};