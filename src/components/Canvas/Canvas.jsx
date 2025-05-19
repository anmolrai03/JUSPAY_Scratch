// Canvas.jsx (simplified)
import Preview from './Preview/Preview';

function Canvas({ sprites }) {
  return (
    <div className="h-full relative bg-gray-50 rounded-lg">
      {sprites.map(sprite => (
        <Preview 
          key={sprite.id}
          x={sprite.x}
          y={sprite.y}
          scale={sprite.scale}
          component={sprite.component}
        />
      ))}
    </div>
  );
}

export default Canvas;