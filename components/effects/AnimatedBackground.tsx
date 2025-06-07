'use client';

import React, { useState, useEffect, useRef } from 'react';

interface Shape {
  id: string;
  type: 'circle' | 'square' | 'triangle' | 'hexagon';
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
  color: string;
  rotation?: number;
  dRotation?: number;
}

const NUM_SHAPES = 15;
const SHAPE_TYPES: Shape['type'][] = ['circle', 'square', 'triangle', 'hexagon'];
const COLORS = ['#494d51', '#494d51', '#494d51', '#494d51', '#494d51', '#494d51', '#494d51'];

const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;

const getPolygonPoints = (type: 'triangle' | 'hexagon', centerX: number, centerY: number, size: number, rotation: number = 0): string => {
  const points: { x: number; y: number }[] = [];
  const angleOffset = type === 'triangle' ? Math.PI / 2 : 0;

  const numVertices = type === 'triangle' ? 3 : 6;
  for (let i = 0; i < numVertices; i++) {
    const angle = (Math.PI * 2 / numVertices) * i - angleOffset + rotation;
    points.push({
      x: centerX + size * Math.cos(angle),
      y: centerY + size * Math.sin(angle),
    });
  }
  return points.map(p => `${p.x},${p.y}`).join(' ');
};


export default function AnimatedBackground() {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const updateSize = () => {
      setViewportSize({ width: window.innerWidth, height: window.innerHeight });
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    if (viewportSize.width === 0 || viewportSize.height === 0) return;

    const initialShapes: Shape[] = [];
    for (let i = 0; i < NUM_SHAPES; i++) {
      const size = randomBetween(20, 60);
      const type = SHAPE_TYPES[Math.floor(Math.random() * SHAPE_TYPES.length)];
      initialShapes.push({
        id: `shape-${i}-${Date.now()}`,
        type,
        x: randomBetween(size, viewportSize.width - size),
        y: randomBetween(size, viewportSize.height - size),
        dx: randomBetween(-1, 1) * 0.8,
        dy: randomBetween(-1, 1) * 0.8,
        size: size / 2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotation: type !== 'circle' && type !== 'square' ? randomBetween(0, Math.PI * 2) : 0,
        dRotation: type !== 'circle' && type !== 'square' ? randomBetween(-0.01, 0.01) : 0,
      });
    }
    setShapes(initialShapes);
  }, [viewportSize]);

  useEffect(() => {
    if (shapes.length === 0 || viewportSize.width === 0) return;

    const animate = () => {
      setShapes(prevShapes =>
        prevShapes.map(shape => {
          let newX = shape.x + shape.dx;
          let newY = shape.y + shape.dy;
          let newDx = shape.dx;
          let newDy = shape.dy;
          let newRotation = shape.rotation !== undefined ? shape.rotation + (shape.dRotation || 0) : undefined;

          if (newX + shape.size > viewportSize.width || newX - shape.size < 0) {
            newDx = -newDx;
            newX = (newX + shape.size > viewportSize.width) ? viewportSize.width - shape.size : shape.size;
          }
          if (newY + shape.size > viewportSize.height || newY - shape.size < 0) {
            newDy = -newDy;
            newY = (newY + shape.size > viewportSize.height) ? viewportSize.height - shape.size : shape.size;
          }

          return { ...shape, x: newX, y: newY, dx: newDx, dy: newDy, rotation: newRotation };
        })
      );
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [shapes, viewportSize]);

  if (viewportSize.width === 0 || shapes.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        overflow: 'hidden',
      }}
    >
      <svg width="100%" height="100%">
        {shapes.map(shape => {
          const commonProps = {
            fill: shape.color,
            style: { opacity: 0.6 }
          };
          switch (shape.type) {
            case 'circle':
              return <circle key={shape.id} cx={shape.x} cy={shape.y} r={shape.size} {...commonProps} />;
            case 'square':
              return <rect key={shape.id} x={shape.x - shape.size} y={shape.y - shape.size} width={shape.size * 2} height={shape.size * 2} {...commonProps} transform={`rotate(${(shape.rotation || 0) * 180 / Math.PI}, ${shape.x}, ${shape.y})`} />;
            case 'triangle':
              return <polygon key={shape.id} points={getPolygonPoints('triangle', shape.x, shape.y, shape.size, shape.rotation)} {...commonProps} />;
            case 'hexagon':
              return <polygon key={shape.id} points={getPolygonPoints('hexagon', shape.x, shape.y, shape.size, shape.rotation)} {...commonProps} />;
            default:
              return null;
          }
        })}
      </svg>
    </div>
  );
}