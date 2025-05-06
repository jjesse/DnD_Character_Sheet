import { Stack, PasswordInput, Button, Switch } from '@mantine/core';
import { useState } from 'react';
import { useProfileErrors } from '../hooks/useProfileErrors';
import { ErrorDisplay } from './ErrorDisplay';

interface SecuritySettingsProps {
  onSave: (settings: SecuritySettings) => void;
  initialSettings: SecuritySettings;
}

interface SecuritySettings {
  twoFactorEnabled: boolean;
  sessionTimeout: number;
}

export const SecuritySettings = ({ onSave, initialSettings }: SecuritySettingsProps) => {
  const [settings, setSettings] = useState(initialSettings);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const { errors, validateField, clearErrors } = useProfileErrors();

  const handleSave = () => {
    if (newPassword) {
      const passwordErrors = validateField('password', newPassword);
      if (passwordErrors.length > 0) {
        return;
      }
    }
    
    onSave({
      ...settings,
      passwordChange: newPassword ? { current: currentPassword, new: newPassword } : undefined
    });
    setCurrentPassword('');
    setNewPassword('');
    clearErrors();
  };

  const handlePasswordChange = (value: string) => {
    setNewPassword(value);
    if (value) {
      const passwordErrors = validateField('password', value);
      if (passwordErrors.length > 0) {
        // Handle password validation errors
        return;
      }
    }
    clearErrors('password');
  };

  return (
    <Stack>
      <Switch
        label="Enable Two-Factor Authentication"
        checked={settings.twoFactorEnabled}
        onChange={(e) => setSettings({ ...settings, twoFactorEnabled: e.currentTarget.checked })}
      />
      <PasswordInput
        label="Current Password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.currentTarget.value)}
      />
      <PasswordInput
        label="New Password"
        value={newPassword}
        onChange={(e) => handlePasswordChange(e.currentTarget.value)}
        error={errors.password?.length > 0}
      />
      {errors.password && <ErrorDisplay errors={errors.password} onDismiss={() => clearErrors('password')} />}
      <Button onClick={handleSave}>Update Security Settings</Button>
    </Stack>
  );
};