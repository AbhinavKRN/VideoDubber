'use client';

import { useEffect, useRef, useState } from 'react';
import { Group, Button, Text, Slider, Box } from '@mantine/core';
import { IconPlayerPlay, IconPlayerPause } from '@tabler/icons-react';

interface TimelineProps {
  mediaItems: Array<{
    id: string;
    startTime: number;
    endTime: number;
  }>;
  currentTime: number;
  setCurrentTime: (time: number | ((prevTime: number) => number)) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

export default function Timeline({ 
  mediaItems, 
  currentTime, 
  setCurrentTime, 
  isPlaying, 
  setIsPlaying 
}: TimelineProps) {
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  
  const maxEndTime = mediaItems.length > 0 
    ? Math.max(...mediaItems.map(item => item.endTime)) 
    : 60; 
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  useEffect(() => {
    if (isPlaying) {
      lastTimeRef.current = performance.now();
      
      const animate = (time: number) => {
        const deltaTime = (time - lastTimeRef.current) / 1000;
        lastTimeRef.current = time;
        
        const newTime = Math.min(currentTime + deltaTime, maxEndTime);
        if (newTime >= maxEndTime) {
          setIsPlaying(false);
          setCurrentTime(maxEndTime);
        } else {
          setCurrentTime(newTime);
        }
        
        animationRef.current = requestAnimationFrame(animate);
      };
      
      animationRef.current = requestAnimationFrame(animate);
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, setCurrentTime, maxEndTime, setIsPlaying, currentTime]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <Box p="md" bg="gray.1">
      <Group mb="sm">
        <Button
          onClick={togglePlay}
          variant="subtle"
          leftSection={isPlaying ? <IconPlayerPause size={16} /> : <IconPlayerPlay size={16} />}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </Button>
        
        <Text>
          {formatTime(currentTime)} / {formatTime(maxEndTime)}
        </Text>
      </Group>
      
      <Slider
        value={currentTime}
        onChange={setCurrentTime}
        max={maxEndTime}
        min={0}
        step={0.1}
        label={formatTime}
        styles={{
          track: { cursor: 'pointer' },
          thumb: { cursor: 'grab' },
        }}
      />
    </Box>
  );
}
