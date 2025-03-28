'use client';

import { Group, Title, Button, ActionIcon } from '@mantine/core';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';

export default function Header() {
  return (
    <Group justify="space-between" h="100%" px="md">
      <Group>
        <ActionIcon variant="subtle">
          <IconArrowLeft size={20} />
        </ActionIcon>
        <ActionIcon variant="subtle" disabled>
          <IconArrowRight size={20} />
        </ActionIcon>
        <Title order={4}>Project Name</Title>
      </Group>
      
      <Group>
        <Button variant="outline" size="sm">Save</Button>
        <Button size="sm">Done</Button>
      </Group>
    </Group>
  );
}
