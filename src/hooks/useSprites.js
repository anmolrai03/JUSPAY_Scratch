import { useState, useRef, useEffect } from 'react';

export default function useSprites(initialSprites = []) {
  const [sprites, setSprites] = useState(initialSprites);
  const spritesRef = useRef(sprites);

  // Sync state with ref
  useEffect(() => {
    spritesRef.current = sprites;
  }, [sprites]);

  // Helper methods
  const addSprite = (newSprite) => {
    setSprites(prev => [...prev, newSprite]);
  };

  const updateSprite = (id, updates) => {
    setSprites(prev => prev.map(sprite => 
      sprite.id === id ? { ...sprite, ...updates } : sprite
    ));
  };

  return {
    sprites,
    setSprites,
    spritesRef,
    addSprite,
    updateSprite
  };
}