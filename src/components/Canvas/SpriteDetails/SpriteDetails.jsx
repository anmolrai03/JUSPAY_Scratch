
import React, { useState } from 'react';

function SpriteDetails({ sprite, onPositionChange }) {
  const [position, setPosition] = useState({
    x: sprite?.x || 0,
    y: sprite?.y || 0,
    scale: sprite?.scale || 1
  });

  const handleChange = (e) => {
    const newPosition = {
      ...position,
      [e.target.name]: parseFloat(e.target.value)
    };
    setPosition(newPosition);
    onPositionChange(newPosition);
  };

  return (
    <div className="p-4 bg-white h-1/2">
      <h3 className="text-lg font-semibold mb-4">Sprite Properties</h3>
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <label className="w-20">X:</label>
          <input
            type="number"
            name="x"
            value={position.x}
            onChange={handleChange}
            className="w-24 px-2 py-1 border rounded"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="w-20">Y:</label>
          <input
            type="number"
            name="y"
            value={position.y}
            onChange={handleChange}
            className="w-24 px-2 py-1 border rounded"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="w-20">Scale:</label>
          <input
            type="number"
            name="scale"
            step="0.1"
            min="0.1"
            max="2"
            value={position.scale}
            onChange={handleChange}
            className="w-24 px-2 py-1 border rounded"
          />
        </div>
      </div>
    </div>
  );
}

export default SpriteDetails;