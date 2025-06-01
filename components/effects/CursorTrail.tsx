'use client';

import React, { useState, useEffect, useCallback } from 'react';

interface Point {
  x: number;
  y: number;
  id: string;
  timestamp: number; 
}

const PARTICLES_PER_MOVE = 3;
const SPREAD_RADIUS = 1;
const MAX_BUFFER_POINTS = 500;
const PARTICLE_LIFESPAN_MS = 700;
const PARTICLE_SIZE_START = 10;

export default function CursorTrail() {
  const [points, setPoints] = useState<Point[]>([]);
  const [currentTime, setCurrentTime] = useState(Date.now());

  const handleMouseMove = useCallback((event: MouseEvent) => {
    let currentElement = event.target as HTMLElement | null;
    let ignoreTrail = false;

    while (currentElement) {
      if (currentElement.matches && currentElement.matches('[data-cursor-trail-ignore="true"]')) {
        ignoreTrail = true;
        break;
      }
      currentElement = currentElement.parentElement;
    }

    if (ignoreTrail) {
      return;
    }

    const newPointsBatch: Point[] = [];
    for (let i = 0; i < PARTICLES_PER_MOVE; i++) {
      const offsetX = (Math.random() - 0.5) * 2 * SPREAD_RADIUS;
      const offsetY = (Math.random() - 0.5) * 2 * SPREAD_RADIUS;

      newPointsBatch.push({
        x: event.clientX + offsetX,
        y: event.clientY + offsetY,
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}-${i}`,
        timestamp: Date.now(),
      });
    }
    setPoints(prevPoints => [...newPointsBatch, ...prevPoints].slice(0, MAX_BUFFER_POINTS));
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  useEffect(() => {
    let animationFrameId: number;
    const updateAnimation = () => {
      setCurrentTime(Date.now());
      animationFrameId = requestAnimationFrame(updateAnimation);
    };
    animationFrameId = requestAnimationFrame(updateAnimation);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const visiblePoints = points.filter(p => (currentTime - p.timestamp) < PARTICLE_LIFESPAN_MS);

  return (
    <>
      {visiblePoints.map(point => {
        const age = currentTime - point.timestamp;
        const progress = age / PARTICLE_LIFESPAN_MS;

        const opacity = Math.max(0, 1 - progress * 1.2);
        const scale = Math.max(0, 1 - progress * 0.8);
        const blurAmount = 2 + progress * 8;

        const style: React.CSSProperties = {
          position: 'fixed',
          left: `${point.x}px`,
          top: `${point.y}px`,
          width: `${PARTICLE_SIZE_START * scale}px`,
          height: `${PARTICLE_SIZE_START * scale}px`,
          backgroundColor: `rgba(0, 0, 0, ${opacity * 0.4})`,
          borderRadius: '50%',
          opacity: opacity,
          transform: `translate(-50%, -50%) scale(${scale})`,
          pointerEvents: 'none',
          zIndex: 9999,
          filter: `blur(${blurAmount}px) saturate(0.1)`,
          boxShadow: `0 0 ${Math.max(0, 5 - progress * 5)}px ${Math.max(0, 2 - progress * 2)}px rgba(0,0,0,${opacity * 0.2})`,
          mixBlendMode: 'normal',
        };

        return <div key={point.id} style={style} />;
      })}
    </>
  );
}