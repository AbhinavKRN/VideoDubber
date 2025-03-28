'use client';

import { useRef } from 'react';
import { Box, Text, Center } from '@mantine/core';
import MediaItem from './MediaItem';

interface CanvasProps {
  mediaItems: Array<{
    id: string;
    type: 'video' | 'image';
    url: string;
    width: number;
    height: number;
    x: number;
    y: number;
    startTime: number;
    endTime: number;
    selected: boolean;
  }>;
  currentTime: number;
  selectItem: (id: string) => void;
  updateMediaItem: (id: string, updates: any) => void;
}

export default function Canvas({ mediaItems, currentTime, selectItem, updateMediaItem }: CanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);

  return (
    <Box
      ref={canvasRef}
      style={{
        width: '100%',
        height: 'calc(100vh - 180px)',
        backgroundColor: '#000',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {mediaItems.length === 0 ? (
        <Center h="100%">
          <Text c="dimmed">Upload media to get started</Text>
        </Center>
      ) : (
        <>
          {mediaItems.map((item) => {
            const isVisible = currentTime >= item.startTime && currentTime <= item.endTime;
            
            if (!isVisible) return null;
            
            return (
              <MediaItem
                key={item.id}
                id={item.id}
                type={item.type}
                url={item.url}
                width={item.width}
                height={item.height}
                x={item.x}
                y={item.y}
                selected={item.selected}
                onSelect={() => selectItem(item.id)}
                onResize={(width, height) => updateMediaItem(item.id, { width, height })}
                onDrag={(x, y) => updateMediaItem(item.id, { x, y })}
              />
            );
          })}
        </>
      )}
    </Box>
  );
}
