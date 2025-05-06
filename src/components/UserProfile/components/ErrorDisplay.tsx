import { Alert, CloseButton, Group } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

interface ErrorDisplayProps {
  errors: string[];
  onDismiss: () => void;
}

export const ErrorDisplay = ({ errors, onDismiss }: ErrorDisplayProps) => {
  return (
    <Alert
      icon={<IconAlertCircle size={16} />}
      color="red"
      withCloseButton
      closeButtonLabel="Dismiss error"
      onClose={onDismiss}
    >
      {errors.map((error, index) => (
        <div key={index}>{error}</div>
      ))}
    </Alert>
  );
};