'use client';

import { Stack, Text, Button, NumberInput, Group, FileButton } from '@mantine/core';
import { IconUpload } from '@tabler/icons-react';

interface SidebarProps {
  onFileUpload: (file: File) => void;
  selectedItem: any;
  updateMediaItem: (id: string, updates: any) => void;
}

export default function Sidebar({ onFileUpload, selectedItem, updateMediaItem }: SidebarProps) {
  const handleFileChange = (file: File | null) => {
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <Stack p="md">
      <Text fw={700} size="lg">Add Media</Text>
      
      <FileButton onChange={handleFileChange} accept="image/*, video/*">
        {(props) => (
          <Button {...props} leftSection={<IconUpload size={18} />} fullWidth>
            Upload a File
          </Button>
        )}
      </FileButton>
      
      <Text size="sm" c="dimmed">Drag & drop a file or import from a link</Text>
      
      {selectedItem && (
        <>
          <Text fw={700} size="lg" mt="xl">Media Properties</Text>
          
          <Group grow>
            <NumberInput
              label="Width"
              value={selectedItem.width}
              onChange={(value) => updateMediaItem(selectedItem.id, { width: Number(value) })}
              min={50}
              max={1920}
            />
            <NumberInput
              label="Height"
              value={selectedItem.height}
              onChange={(value) => updateMediaItem(selectedItem.id, { height: Number(value) })}
              min={50}
              max={1080}
            />
          </Group>
          
          <Group grow>
            <NumberInput
              label="Start Time (s)"
              value={selectedItem.startTime}
              onChange={(value) => updateMediaItem(selectedItem.id, { startTime: Number(value) })}
              min={0}
            />
            <NumberInput
              label="End Time (s)"
              value={selectedItem.endTime}
              onChange={(value) => updateMediaItem(selectedItem.id, { endTime: Number(value) })}
              min={selectedItem.startTime + 0.1}
            />
          </Group>
        </>
      )}
    </Stack>
  );
}
