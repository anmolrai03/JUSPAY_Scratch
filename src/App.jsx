import { useState, useRef } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Block from './components/Block';
import Sprite from './components/Sprite';
import Workspace from './components/Workspace';

// Define block templates with default parameters
const motionBlocks = [
  { type: 'MOVE_STEPS', label: 'Move steps', params: { steps: 10 } },
  { type: 'TURN_DEGREES', label: 'Turn degrees', params: { degrees: 15 } },
  { type: 'GO_TO_XY', label: 'Go to x: y:', params: { x: 0, y: 0 } },
  { type: 'REPEAT', label: 'Repeat times', params: { times: 2 } },
];

const looksBlocks = [
  { type: 'SAY_FOR_SECONDS', label: 'Say for seconds', params: { text: 'Hello', seconds: 2 } },
  { type: 'THINK_FOR_SECONDS', label: 'Think for seconds', params: { text: 'Hmm', seconds: 2 } },
];

function App() {
  const [sprites, setSprites] = useState([]);
  const [sequences, setSequences] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const canvasRef = useRef(null);

  // Add new sprite at the center of the canvas
  const addSprite = (type) => {
    const canvas = canvasRef.current;
    const canvasWidth = canvas ? canvas.clientWidth : window.innerWidth;
    const canvasHeight = canvas ? canvas.clientHeight : window.innerHeight;
    const newSprite = {
      id: Date.now(),
      type,
      x: canvasWidth / 2 - 25, // Center horizontally (sprite width: 50px)
      y: canvasHeight / 2 - 25, // Center vertically (sprite height: 50px)
      direction: 90,
      message: '',
      messageType: '',
      messageVisible: false,
    };
    setSprites(prev => [...prev, newSprite]);
    setSequences(prev => ({ ...prev, [newSprite.id]: [] }));
  };

  // Update sprite properties
  const updateSprite = (spriteId, updates) => {
    setSprites(prev => prev.map(sprite => 
      sprite.id === spriteId ? { ...sprite, ...updates } : sprite
    ));
  };

  // Execute animation sequence
  const executeSequence = async (spriteId, sequence) => {
    const sprite = sprites.find(s => s.id === spriteId);
    if (!sprite) return;

    for (const block of sequence) {
      switch(block.type) {
        case 'MOVE_STEPS': {
          const steps = block.params.steps;
          const angle = (sprite.direction * Math.PI) / 180;
          const newX = sprite.x + steps * Math.cos(angle);
          const newY = sprite.y - steps * Math.sin(angle);
          updateSprite(spriteId, { x: newX, y: newY });
          await new Promise(resolve => setTimeout(resolve, 500));
          break;
        }
        
        case 'TURN_DEGREES': {
          const degrees = block.params.degrees;
          updateSprite(spriteId, { direction: sprite.direction + degrees });
          await new Promise(resolve => setTimeout(resolve, 500));
          break;
        }
        
        case 'GO_TO_XY': {
          const { x, y } = block.params;
          updateSprite(spriteId, { x, y });
          await new Promise(resolve => setTimeout(resolve, 500));
          break;
        }
        
        case 'SAY_FOR_SECONDS': {
          const { text, seconds } = block.params;
          updateSprite(spriteId, { 
            message: text, 
            messageType: 'say', 
            messageVisible: true 
          });
          await new Promise(resolve => setTimeout(resolve, seconds * 1000));
          updateSprite(spriteId, { messageVisible: false });
          break;
        }
        
        case 'THINK_FOR_SECONDS': {
          const { text, seconds } = block.params;
          updateSprite(spriteId, { 
            message: text, 
            messageType: 'think', 
            messageVisible: true 
          });
          await new Promise(resolve => setTimeout(resolve, seconds * 1000));
          updateSprite(spriteId, { messageVisible: false });
          break;
        }
        
        case 'REPEAT': {
          const times = block.params.times;
          const blockIndex = sequence.indexOf(block);
          const blocksToRepeat = sequence.slice(0, blockIndex);
          for (let j = 0; j < times; j++) {
            await executeSequence(spriteId, blocksToRepeat);
          }
          break;
        }
      }
    }
  };

  // Play all animations
  const playAnimations = async () => {
    setIsPlaying(true);
    try {
      for (const sprite of sprites) {
        if (sequences[sprite.id]?.length) {
          await executeSequence(sprite.id, sequences[sprite.id]);
        }
      }
    } finally {
      setIsPlaying(false);
    }
  };

  // Handle adding blocks to workspace
  const handleAddBlock = (spriteId, block) => {
    setSequences(prev => ({
      ...prev,
      [spriteId]: [...(prev[spriteId] || []), { ...block }]
    }));
  };

  // Handle updating block parameters
  const handleUpdateBlock = (spriteId, blockIndex, updatedBlock) => {
    setSequences(prev => {
      const newSequences = { ...prev };
      const spriteSequence = [...newSequences[spriteId]];
      spriteSequence[blockIndex] = updatedBlock;
      newSequences[spriteId] = spriteSequence;
      return newSequences;
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen">
        {/* Left Sidebar - Blocks */}
        <div className="w-64 bg-gray-100 p-4 border-r">
          <h2 className="text-lg font-bold text-blue-600 mb-4">Motion Blocks</h2>
          {motionBlocks.map(block => (
            <Block key={block.type} block={block} />
          ))}
          
          <h2 className="text-lg font-bold text-purple-600 mt-6 mb-4">Looks Blocks</h2>
          {looksBlocks.map(block => (
            <Block key={block.type} block={block} />
          ))}
        </div>

        {/* Center Canvas */}
        <div ref={canvasRef} className="flex-1 bg-white relative">
          {sprites.map(sprite => (
            <Sprite key={sprite.id} {...sprite} />
          ))}
        </div>

        {/* Right Panel - Sprites & Workspace */}
        <div className="w-96 bg-gray-50 p-4 border-l overflow-y-scroll">
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-4">Sprite Management</h2>
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => addSprite('cat')}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                Add Cat
              </button>
              <button
                onClick={() => addSprite('airplane')}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                Add Airplane
              </button>
              <button
                onClick={() => addSprite('character')}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                Add Character
              </button>
            </div>
            
            <button
              onClick={playAnimations}
              disabled={isPlaying}
              className={`w-full py-2 rounded text-white ${
                isPlaying ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {isPlaying ? 'Playing...' : 'Play Animations'}
            </button>
          </div>

          <div className="space-y-6">
            {sprites.map(sprite => (
              <Workspace
                key={sprite.id}
                spriteId={sprite.id}
                sequence={sequences[sprite.id] || []}
                onAddBlock={block => handleAddBlock(sprite.id, block)}
                onUpdateBlock={handleUpdateBlock}
                spriteName={sprite.type}
                position={{ x: sprite.x, y: sprite.y }}
              />
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

export default App;