import React from 'react';
import { Group, Image, FileInput, Button } from '@mantine/core';
import { useState } from 'react';

interface CharacterPortraitProps {
  imageUrl: string;
  onImageChange: (url: string) => void;
}

export const CharacterPortrait = ({ imageUrl, onImageChange }: CharacterPortraitProps) => {
  const handleFileUpload = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageChange(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Group>
      {imageUrl && (
        <Image
          src={imageUrl}
          width={200}
          height={200}
          radius="md"
          alt="Character Portrait"
        />
      )}
      <FileInput
        label="Upload portrait"
        description="Choose an image file"
        accept="image/*"
        onChange={handleFileUpload}
      />
    </Group>
  );
};