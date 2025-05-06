import React from 'react';
import { TextInput, Button, Paper, Stack, Title } from '@mantine/core';
import { useState } from 'react';
import { AuthService } from '../services/AuthService';

interface LoginProps {
  onLogin: () => void;
}

export const Login = ({ onLogin }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await AuthService.login(email, password);
      onLogin();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Paper p="xl" shadow="md">
      <form onSubmit={handleSubmit}>
        <Stack>
          <Title order={2}>Login</Title>
          <TextInput
            required
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextInput
            required
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Login</Button>
        </Stack>
      </form>
    </Paper>
  );
};