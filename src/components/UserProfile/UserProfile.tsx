import { Paper, Stack, Tabs } from '@mantine/core';
import { PreferencesForm } from './components/PreferencesForm';
import { SecuritySettings } from './components/SecuritySettings';
import { useProfile } from './ProfileContext';
import { useStyles } from './styles';

export const UserProfile = () => {
  const { classes } = useStyles();
  const { profile, updateProfile, saveProfile } = useProfile();

  if (!profile) return null;

  return (
    <Paper className={classes.profileCard}>
      <Tabs defaultValue="preferences">
        <Tabs.List>
          <Tabs.Tab value="preferences">Preferences</Tabs.Tab>
          <Tabs.Tab value="security">Security</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="preferences" pt="xs">
          <PreferencesForm
            initialPreferences={profile.preferences}
            onSave={async (preferences) => {
              updateProfile({ preferences });
              await saveProfile();
            }}
          />
        </Tabs.Panel>

        <Tabs.Panel value="security" pt="xs">
          <SecuritySettings
            initialSettings={profile.securitySettings}
            onSave={async (settings) => {
              updateProfile({ securitySettings: settings });
              await saveProfile();
            }}
          />
        </Tabs.Panel>
      </Tabs>
    </Paper>
  );
};