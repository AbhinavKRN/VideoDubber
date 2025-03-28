'use client';

import { useState } from 'react';
import { AppShell, Group, Button } from '@mantine/core';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import Timeline from './components/Timeline';
import MediaControls from './components/MediaControls';
import UploadSection from './components/UploadSection';

export default function Home() {
  const [mediaItems, setMediaItems] = useState<Array<{
    id: string;
    type: 'video' | 'image';
    file: File;
    url: string;
    width: number;
    height: number;
    x: number;
    y: number;
    startTime: number;
    endTime: number;
    selected: boolean;
  }>>([]);
  
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  const handleFileUpload = (file: File) => {
    const fileType = file.type.startsWith('video') ? 'video' : 'image';
    const url = URL.createObjectURL(file);
    
    const newItem = {
      id: `media-${Date.now()}`,
      type: fileType as 'video' | 'image',
      file,
      url,
      width: 320,
      height: 240,
      x: 100,
      y: 100,
      startTime: 0,
      endTime: fileType === 'video' ? 30 : 5,
      selected: true,
    };
    
    setMediaItems(prev => {
      return [...prev.map(item => ({...item, selected: false})), newItem];
    });
    
    setSelectedItemId(newItem.id);
  };

  const updateMediaItem = (id: string, updates: Partial<typeof mediaItems[0]>) => {
    setMediaItems(prev => 
      prev.map(item => item.id === id ? {...item, ...updates} : item)
    );
  };

  const selectItem = (id: string) => {
    setMediaItems(prev => 
      prev.map(item => ({...item, selected: item.id === id}))
    );
    setSelectedItemId(id);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const selectedItem = mediaItems.find(item => item.id === selectedItemId);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm' }}
      padding="md"
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>
      
      <AppShell.Navbar>
        <Sidebar>
          <UploadSection onFileUpload={handleFileUpload} />
          {selectedItem && (
            <>
              <MediaControls isMuted={isMuted} toggleMute={toggleMute} />
              {/* Add other media property controls here */}
            </>
          )}
        </Sidebar>
      </AppShell.Navbar>
      
      <AppShell.Main>
        <Canvas 
          mediaItems={mediaItems} 
          currentTime={currentTime}
          selectItem={selectItem}
          updateMediaItem={updateMediaItem}
        />
        <Timeline 
          mediaItems={mediaItems}
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
      </AppShell.Main>
    </AppShell>
  );
}
