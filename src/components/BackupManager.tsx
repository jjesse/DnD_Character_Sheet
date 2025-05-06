import React from 'react';
import { Button, Group, Stack, Text, FileInput } from '@mantine/core';
import { BackupService } from '../services/BackupService';

interface BackupManagerProps {
  onBackupRestored: () => void;
}

export const BackupManager = ({ onBackupRestored }: BackupManagerProps) => {
  const handleBackup = () => {
    const backup = BackupService.createBackup();
    const blob = new Blob([backup], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `dnd-characters-backup-${new Date().toISOString()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleRestore = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        if (BackupService.restoreBackup(content)) {
          onBackupRestored();
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <Stack>
      <Text>Create a backup of all your characters or restore from a previous backup.</Text>
      <Group>
        <Button onClick={handleBackup} color="blue">
          Download Backup
        </Button>
        <FileInput
          label="Restore from backup"
          description="Upload a backup file"
          accept=".json"
          onChange={handleRestore}
        />
      </Group>
    </Stack>
  );
}