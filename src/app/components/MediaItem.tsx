'use client';

import { useRef, useState } from 'react';
import { Resizable } from 'react-resizable';
import Draggable from 'react-draggable';
import 'react-resizable/css/styles.css';

interface MediaItemProps {
  id: string;
  type: 'video' | 'image';
  url: string;
  width: number;
  height: number;
  x: number;
  y: number;
  selected: boolean;
  onSelect: () => void;
  onResize: (width: number, height: number) => void;
  onDrag: (x: number, y: number) => void;
}

export default function MediaItem({
  id,
  type,
  url,
  width,
  height,
  x,
  y,
  selected,
  onSelect,
  onResize,
  onDrag
}: MediaItemProps) {
  const nodeRef = useRef(null);
  const [position, setPosition] = useState({ x, y });

  const handleResize = (event: any, { size }: { size: { width: number; height: number } }) => {
    onResize(size.width, size.height);
  };

  const handleDrag = (e: any, data: { x: number; y: number }) => {
    setPosition({ x: data.x, y: data.y });
    onDrag(data.x, data.y);
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".handle"
      position={position}
      onDrag={handleDrag}
      bounds="parent"
    >
      <div
        ref={nodeRef}
        className={`media-item handle ${selected ? 'selected' : ''}`}
        onClick={onSelect}
        style={{
          position: 'absolute',
          border: selected ? '2px solid #3498db' : 'none',
          boxSizing: 'border-box',
        }}
      >
        <Resizable
          width={width}
          height={height}
          onResize={handleResize}
          minConstraints={[50, 50]}
          maxConstraints={[1000, 1000]}
        >
          <div style={{ width: `${width}px`, height: `${height}px` }}>
            {type === 'video' ? (
              <video
                src={url}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                autoPlay={false}
              />
            ) : (
              <img
                src={url}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                alt="Media"
              />
            )}
          </div>
        </Resizable>
      </div>
    </Draggable>
  );
}
