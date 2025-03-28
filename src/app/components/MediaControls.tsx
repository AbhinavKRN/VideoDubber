'use client';

import { Group, ActionIcon, Tooltip } from '@mantine/core';
import { IconCut, IconVolume, IconVolumeOff } from '@tabler/icons-react';

interface MediaControlsProps {
  isMuted: boolean;
  toggleMute: () => void;
}

export default function MediaControls({ isMuted, toggleMute }: MediaControlsProps) {
  return (
    <Group>
      <Tooltip label="Cut">
        <ActionIcon variant="subtle" size="md">
          <IconCut size={18} />
        </ActionIcon>
      </Tooltip>
      
      <Tooltip label={isMuted ? "Unmute" : "Mute"}>
        <ActionIcon variant="subtle" size="md" onClick={toggleMute}>
          {isMuted ? <IconVolumeOff size={18} /> : <IconVolume size={18} />}
        </ActionIcon>
      </Tooltip>
    </Group>
  );
}
