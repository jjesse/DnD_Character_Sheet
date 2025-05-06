import React from 'react';
import { Alert, AlertIcon, VStack } from '@chakra-ui/react';

interface ErrorDisplayProps {
  errors: string[];
  type?: 'error' | 'warning' | 'info' | 'success';
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ 
  errors, 
  type = 'error' 
}) => {
  if (!errors || errors.length === 0) return null;

  return (
    <VStack spacing={2} w="100%">
      {errors.map((error, index) => (
        <Alert key={index} status={type} borderRadius="md">
          <AlertIcon />
          {error}
        </Alert>
      ))}
    </VStack>
  );
};