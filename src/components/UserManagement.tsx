import { Tabs, Button, TextInput, Stack, Paper, Text } from '@mantine/core';
import { useState } from 'react';
import { AuthService } from '../services/AuthService';

export const UserManagement = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const currentUser = AuthService.getCurrentUser();

  const handleChangePassword = async () => {
    // In a real app, this would make an API call
    console.log('Password change requested');
  };

  const handleDeleteAccount = async () => {
    if (confirm('Are you sure you want to delete your account? This cannot be undone.')) {
      AuthService.logout();
      window.location.reload();
    }
  };

  return (
    <Paper p="md">
      <Tabs defaultValue="profile">
        <Tabs.List>
          <Tabs.Tab value="profile">Profile</Tabs.Tab>
          <Tabs.Tab value="security">Security</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="profile" pt="xs">
          <Stack>
            <Text>Username: {currentUser?.username}</Text>
            <Text>Email: {currentUser?.email}</Text>
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="security" pt="xs">
          <Stack>
            <TextInput
              type="password"
              label="Current Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextInput
              type="password"
              label="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Button onClick={handleChangePassword}>Change Password</Button>
            <Button color="red" onClick={handleDeleteAccount}>
              Delete Account
            </Button>
          </Stack>
        </Tabs.Panel>
      </Tabs>
    </Paper>
  );
};