import React from 'react';
import { Container, Header, Group, Title, Button, Menu, Stack } from '@mantine/core';
import { useState } from 'react';
import { IconUser } from '@tabler/icons-react';
import CharacterSheet from './components/CharacterSheet';
import { ThemeProvider } from './components/ThemeProvider';
import { ThemeToggle } from './components/ThemeProvider/ThemeToggle';
import { Login } from './components/Login';
import { UserProfile } from './components/UserProfile';
import { AuthService } from './services/AuthService';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(AuthService.isAuthenticated());
  const [showUserManagement, setShowUserManagement] = useState(false);

  const handleLogout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
  };

  return (
    <ThemeProvider>
      <Header height={60} p="xs">
        <Group position="apart">
          <Title order={2}>D&D Character Sheet</Title>
          <Group>
            {isAuthenticated && (
              <Menu>
                <Menu.Target>
                  <Button variant="subtle" leftIcon={<IconUser size={14} />}>
                    {AuthService.getCurrentUser()?.username}
                  </Button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item onClick={() => setShowUserManagement(!showUserManagement)}>
                    Account Settings
                  </Menu.Item>
                  <Menu.Item color="red" onClick={handleLogout}>
                    Logout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}
            <ThemeToggle />
          </Group>
        </Group>
      </Header>
      <Container size="xl" py="md">
        {isAuthenticated ? (
          showUserManagement ? (
            <Stack>
              <Button onClick={() => setShowUserManagement(false)}>Back to Characters</Button>
              <UserProfile />
            </Stack>
          ) : (
            <CharacterSheet />
          )
        ) : (
          <Login onLogin={() => setIsAuthenticated(true)} />
        )}
      </Container>
    </ThemeProvider>
  );
};

export default App;