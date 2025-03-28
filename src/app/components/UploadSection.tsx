'use client';

import { Group, Text, Button, FileButton, Stack, Box } from '@mantine/core';
import { IconUpload, IconLink } from '@tabler/icons-react';
import { useState } from 'react';

interface UploadSectionProps {
  onFileUpload: (file: File) => void;
}

export default function UploadSection({ onFileUpload }: UploadSectionProps) {
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (file: File | null) => {
    if (file) {
      onFileUpload(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <Stack >
      <Text fw={700} size="lg">Add Media</Text>
      
      <Box
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        sx={{
          border: `2px dashed ${dragActive ? '#3498db' : '#e0e0e0'}`,
          borderRadius: '8px',
          padding: '20px',
          textAlign: 'center',
          backgroundColor: dragActive ? 'rgba(52, 152, 219, 0.05)' : 'transparent',
          transition: 'all 0.2s ease',
        }}
      >
        <Stack align="center" >
          <IconUpload size={40} color={dragActive ? '#3498db' : '#aaa'} />
          
          <Text fw={600}>Upload a File</Text>
          <Text size="sm" c="dimmed">Drag & drop a file or</Text>
          
          <FileButton onChange={handleFileChange} accept="image/*, video/*">
            {(props) => (
              <Button {...props} variant="light" size="sm">
                Browse Files
              </Button>
            )}
          </FileButton>
        </Stack>
      </Box>
      
      <Group>
        <Button variant="subtle" leftSection={<IconLink size={16} />}>
          Import from a link
        </Button>
      </Group>
    </Stack>
  );
}
