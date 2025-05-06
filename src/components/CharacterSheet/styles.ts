import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  sheet: {
    padding: theme.spacing.md,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
  },
  section: {
    marginBottom: theme.spacing.md,
  },
  gridContainer: {
    gap: theme.spacing.sm,
  },
  abilityScore: {
    textAlign: 'center',
    padding: theme.spacing.xs,
  }
}));