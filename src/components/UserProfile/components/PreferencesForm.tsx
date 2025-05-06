import { Stack, Switch, Select, Button, TextInput } from '@mantine/core';
import { useState } from 'react';
import { useProfileErrors } from '../hooks/useProfileErrors';
import { useProfileLoading } from '../hooks/useProfileLoading';
import { ErrorDisplay } from './ErrorDisplay';

interface PreferencesFormProps {
  initialPreferences: UserPreferences;
  onSave: (preferences: UserPreferences) => Promise<void>;
}

interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  language: string;
  email: string;
}

export const PreferencesForm = ({ initialPreferences, onSave }: PreferencesFormProps) => {
  const [preferences, setPreferences] = useState(initialPreferences);
  const { errors, validateField, clearErrors } = useProfileErrors();
  const { withLoading, isLoading } = useProfileLoading();

  const handleEmailChange = (value: string) => {
    setPreferences(prev => ({ ...prev, email: value }));
    const isValid = validateField('email', value);
    if (!isValid) {
      clearErrors('email');
    }
  };

  const handleSubmit = async () => {
    if (!validateField('email', preferences.email)) {
      await withLoading('savePreferences', () => onSave(preferences));
    }
  };

  return (
    <Stack spacing="md">
      <Select
        label="Theme"
        value={preferences.theme}
        onChange={(value: 'light' | 'dark' | 'system') => 
          setPreferences(prev => ({ ...prev, theme: value }))}
        data={[
          { value: 'light', label: 'Light' },
          { value: 'dark', label: 'Dark' },
          { value: 'system', label: 'System' }
        ]}
      />
      
      <TextInput
        label="Email"
        value={preferences.email}
        onChange={(e) => handleEmailChange(e.currentTarget.value)}
        error={errors.email?.[0]}
      />

      <Select
        label="Language"
        value={preferences.language}
        onChange={(value: string) => 
          setPreferences(prev => ({ ...prev, language: value }))}
        data={[
          { value: 'en', label: 'English' },
          { value: 'es', label: 'Spanish' },
          { value: 'fr', label: 'French' }
        ]}
      />

      <Switch
        label="Enable Notifications"
        checked={preferences.notifications}
        onChange={(e) => 
          setPreferences(prev => ({ ...prev, notifications: e.currentTarget.checked }))}
      />

      {errors.email && <ErrorDisplay errors={errors.email} onDismiss={() => clearErrors('email')} />}

      <Button 
        onClick={handleSubmit}
        loading={isLoading('savePreferences')}
      >
        Save Preferences
      </Button>
    </Stack>
  );
};