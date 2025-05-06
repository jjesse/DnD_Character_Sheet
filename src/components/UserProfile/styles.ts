import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  profileCard: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
  },
  avatar: {
    marginBottom: theme.spacing.md,
  },
  form: {
    maxWidth: 400,
    margin: '0 auto',
  },
  dangerZone: {
    marginTop: theme.spacing.xl * 2,
    padding: theme.spacing.md,
    borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
  }
}));