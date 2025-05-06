import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Alert, Button, Stack } from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ProfileErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Profile error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Stack align="center" spacing="md">
          <Alert
            icon={<IconAlertTriangle size={24} />}
            title="Something went wrong"
            color="red"
          >
            {this.state.error?.message || 'An error occurred while loading your profile'}
          </Alert>
          <Button onClick={() => this.setState({ hasError: false })}>
            Try again
          </Button>
        </Stack>
      );
    }

    return this.props.children;
  }
}