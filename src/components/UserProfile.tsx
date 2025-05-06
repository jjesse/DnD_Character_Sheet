import React from 'react';
import { Paper, Stack, Text, TextInput, Button, Group, Avatar, Modal } from '@mantine/core';
import { useState } from 'react';
import { AuthService } from '../services/AuthService';
import { notifications } from '@mantine/notifications';

export const UserProfile = () => {
  const user = AuthService.getCurrentUser();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleUpdateProfile = async () => {
    try {
      await AuthService.updateProfile({
        username: formData.username,
        email: formData.email
      });
      notifications.show({
        title: 'Success',
        message: 'Profile updated successfully',
        color: 'green'
      });
      setIsEditing(false);
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to update profile',
        color: 'red'
      });
    }
  };

  const handleChangePassword = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      notifications.show({
        title: 'Error',
        message: 'Passwords do not match',
        color: 'red'
      });
      return;
    }

    try {
      await AuthService.changePassword(formData.currentPassword, formData.newPassword);
      notifications.show({
        title: 'Success',
        message: 'Password changed successfully',
        color: 'green'
      });
      setFormData({ ...formData, currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to change password',
        color: 'red'
      });
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await AuthService.deleteAccount();
      window.location.reload();
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to delete account',
        color: 'red'
      });
    }
  };

  return (
    <>
      <Paper p="md" withBorder>
        <Stack>
          <Group position="apart">
            <Group>
              <Avatar size="xl" radius="xl" color="blue">
                {user?.username.charAt(0).toUpperCase()}
              </Avatar>
              {!isEditing ? (
                <Stack spacing={0}>
                  <Text size="xl">{user?.username}</Text>
                  <Text color="dimmed">{user?.email}</Text>
                </Stack>
              ) : (
                <Stack>
                  <TextInput
                    label="Username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  />
                  <TextInput
                    label="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </Stack>
              )}
            </Group>
            <Button onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </Group>

          {isEditing && (
            <Button onClick={handleUpdateProfile}>Save Changes</Button>
          )}

          <Stack spacing="xs">
            <Text weight={700}>Change Password</Text>
            <TextInput
              type="password"
              label="Current Password"
              value={formData.currentPassword}
              onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
            />
            <TextInput
              type="password"
              label="New Password"
              value={formData.newPassword}
              onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
            />
            <TextInput
              type="password"
              label="Confirm New Password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            />
            <Button onClick={handleChangePassword}>Change Password</Button>
          </Stack>

          <Button color="red" onClick={() => setShowDeleteModal(true)}>
            Delete Account
          </Button>
        </Stack>
      </Paper>

      <Modal
        opened={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Account"
      >
        <Stack>
          <Text>Are you sure you want to delete your account? This action cannot be undone.</Text>
          <Group position="apart">
            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button color="red" onClick={handleDeleteAccount}>
              Delete Account
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
};