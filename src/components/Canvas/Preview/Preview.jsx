// Preview.jsx (updated)
import React from 'react';

export default function Preview({ x, y, scale, component: Component }) {
  return (
    <div 
      className="absolute transition-all duration-300"
      style={{
        transform: `translate(${x}px, ${y}px) scale(${scale})`,
        transformOrigin: 'center'
      }}
    >
      {Component && <Component />}
    </div>
  );
}