// utils/collision.js
function checkCollisions(sprites, threshold = 40) {
  const collisions = [];
  
  for (let i = 0; i < sprites.length; i++) {
    for (let j = i + 1; j < sprites.length; j++) {
      const a = sprites[i];
      const b = sprites[j];
      
      if (Math.abs(a.x - b.x) < threshold && 
          Math.abs(a.y - b.y) < threshold) {
        collisions.push([a.id, b.id]);
      }
    }
  }
  
  return collisions;
}

export default checkCollisions;