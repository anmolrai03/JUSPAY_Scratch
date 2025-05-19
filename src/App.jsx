// import { useState, useRef } from 'react';
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// import Block from './components/Block';
// import Sprite from './components/Sprite';
// import Workspace from './components/Workspace';

// // Define block templates with default parameters
// const motionBlocks = [
//   { type: 'MOVE_STEPS', label: 'Move steps', params: { steps: 10 } },
//   { type: 'TURN_DEGREES', label: 'Turn degrees', params: { degrees: 15 } },
//   { type: 'GO_TO_XY', label: 'Go to x: y:', params: { x: 0, y: 0 } },
//   { type: 'REPEAT', label: 'Repeat times', params: { times: 2 } },
//   { type: 'FOREVER', label: 'Forever', params: {} },
// ];

// const looksBlocks = [
//   { type: 'SAY_FOR_SECONDS', label: 'Say for seconds', params: { text: 'Hello', seconds: 2 } },
//   { type: 'THINK_FOR_SECONDS', label: 'Think for seconds', params: { text: 'Hmm', seconds: 2 } },
// ];

// function App() {
//   const [sprites, setSprites] = useState([]);
//   const [sequences, setSequences] = useState({});
//   const [isPlaying, setIsPlaying] = useState(false);
//   const canvasRef = useRef(null);

//   // Add new sprite at the center of the canvas
//   const addSprite = (type) => {
//     const canvas = canvasRef.current;
//     const canvasWidth = canvas ? canvas.clientWidth : window.innerWidth;
//     const canvasHeight = canvas ? canvas.clientHeight : window.innerHeight;

//     const newSprite = {
//       id: Date.now(),
//       type,
//       x: canvasWidth / 2 - 25,
//       y: canvasHeight / 2 - 25,
//       direction: 0,
//       message: '',
//       messageType: '',
//       messageVisible: false,
//     };
//     setSprites(prev => [...prev, newSprite]);
//     setSequences(prev => ({ ...prev, [newSprite.id]: [] }));
//   };

//   // Update sprite properties
//   const updateSprite = (spriteId, updates) => {
//     setSprites(prev => prev.map(sprite => 
//       sprite.id === spriteId ? { ...sprite, ...updates } : sprite
//     ));
//   };

//   // Check if two sprites collide (50x50 bounding box)
//   const checkCollision = (spriteA, spriteB) => {
//     const a = { left: spriteA.x, top: spriteA.y, right: spriteA.x + 50, bottom: spriteA.y + 50 };
//     const b = { left: spriteB.x, top: spriteB.y, right: spriteB.x + 50, bottom: spriteB.y + 50 };
//     return !(
//       a.right < b.left ||
//       a.left > b.right ||
//       a.bottom < b.top ||
//       a.top > b.bottom
//     );
//   };

//   // Execute animation sequence
//   const executeSequence = async (spriteId, sequence) => {

//     const sprite = sprites.find(s => s.id === spriteId);
//     if (!sprite) return;

//     for (const block of sequence) {
//       switch (block.type) {
//         case 'MOVE_STEPS': {
//           const steps = block.params.steps;
//           const angle = (sprite.direction * Math.PI) / 180;
//           const newX = sprite.x + steps * Math.cos(angle);
//           const newY = sprite.y - steps * Math.sin(angle);
//           updateSprite(spriteId, { x: newX, y: newY });
//           await new Promise(resolve => setTimeout(resolve, 500));
//           break;
//         }
//         case 'TURN_DEGREES': {
//           const degrees = block.params.degrees;
//           updateSprite(spriteId, { direction: sprite.direction + degrees });
//           await new Promise(resolve => setTimeout(resolve, 500));
//           break;
//         }
//         case 'GO_TO_XY': {
//           const { x, y } = block.params;
//           updateSprite(spriteId, { x, y });
//           await new Promise(resolve => setTimeout(resolve, 500));
//           break;
//         }
//         case 'SAY_FOR_SECONDS': {
//           const { text, seconds } = block.params;
//           updateSprite(spriteId, { 
//             message: text, 
//             messageType: 'say', 
//             messageVisible: true 
//           });
//           await new Promise(resolve => setTimeout(resolve, seconds * 1000));
//           updateSprite(spriteId, { messageVisible: false });
//           break;
//         }
//         case 'THINK_FOR_SECONDS': {
//           const { text, seconds } = block.params;
//           updateSprite(spriteId, { 
//             message: text, 
//             messageType: 'think', 
//             messageVisible: true 
//           });
//           await new Promise(resolve => setTimeout(resolve, seconds * 1000));
//           updateSprite(spriteId, { messageVisible: false });
//           break;
//         }
//         case 'REPEAT': {
//           const times = block.params.times;
//           const blockIndex = sequence.indexOf(block);
//           const blocksToRepeat = sequence.slice(0, blockIndex);
//           for (let j = 0; j < times; j++) {
//             await executeSequence(spriteId, blocksToRepeat);
//           }
//           break;
//         }
//         case 'FOREVER': {
//           const blockIndex = sequence.indexOf(block);
//           const blocksToRepeat = sequence.slice(0, blockIndex);
//           for (let j = 0; j < 1000; j++) { // Simulate "forever" with a large loop
//             await executeSequence(spriteId, blocksToRepeat);
//           }
//           break;
//         }
//       }
//     }
//   };

//   // Play all animations concurrently with collision detection
//   const playAnimations = async () => {
//     setIsPlaying(true);
//     const collisionInterval = setInterval(() => {
//       for (let i = 0; i < sprites.length; i++) {
//         for (let j = i + 1; j < sprites.length; j++) {
//           if (checkCollision(sprites[i], sprites[j])) {
//             setSequences(prev => {
//               const newSequences = { ...prev };
//               const temp = newSequences[sprites[i].id];
//               newSequences[sprites[i].id] = newSequences[sprites[j].id];
//               newSequences[sprites[j].id] = temp;
//               return newSequences;
//             });
//           }
//         }
//       }
//     }, 100); // Check every 100ms

//     try {
//       await Promise.all(
//         sprites.map(sprite => {
//           if (sequences[sprite.id]?.length) {
//             return executeSequence(sprite.id, sequences[sprite.id]);
//           }
//           return Promise.resolve();
//         })
//       );
//     } finally {
//       clearInterval(collisionInterval);
//       setIsPlaying(false);
//     }
//   };

//   // Handle adding blocks to workspace
//   const handleAddBlock = (spriteId, block) => {
//     setSequences(prev => ({
//       ...prev,
//       [spriteId]: [...(prev[spriteId] || []), { ...block }]
//     }));
//   };

//   // Handle updating block parameters
//   const handleUpdateBlock = (spriteId, blockIndex, updatedBlock) => {
//     setSequences(prev => {
//       const newSequences = { ...prev };
//       const spriteSequence = [...newSequences[spriteId]];
//       spriteSequence[blockIndex] = updatedBlock;
//       newSequences[spriteId] = spriteSequence;
//       return newSequences;
//     });
//   };

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div className="flex h-screen">

//         {/* Left Sidebar - Blocks */}
//         <div className="w-96 bg-gray-100 p-4 border-r">
//           <h2 className="text-lg font-bold text-blue-600 mb-4">Motion Blocks</h2>
//           {motionBlocks.map(block => (
//             <Block key={block.type} block={block} />
//           ))}
          
//           <h2 className="text-lg font-bold text-purple-600 mt-6 mb-4">Looks Blocks</h2>
//           {looksBlocks.map(block => (
//             <Block key={block.type} block={block} />
//           ))}
//         </div>

//         {/* Center Canvas */}
//         <div ref={canvasRef} className="flex-1 bg-white relative">
//           {sprites.map(sprite => (
//             <Sprite key={sprite.id} {...sprite} />
//           ))}
//         </div>

//         {/* Right Panel - Sprites & Workspace */}
//         <div className="w-[25%] bg-gray-50 p-4 border-l overflow-y-scroll">
//           <div className="mb-6">
//             <h2 className="text-lg font-bold mb-4">Sprite Management</h2>
//             <div className="flex gap-2 mb-4">
//               <button
//                 onClick={() => addSprite('cat')}
//                 className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
//               >
//                 Add Cat
//               </button>
//               <button
//                 onClick={() => addSprite('airplane')}
//                 className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
//               >
//                 Add Airplane
//               </button>
//               <button
//                 onClick={() => addSprite('character')}
//                 className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
//               >
//                 Add Character
//               </button>
//             </div>
            
//             <button
//               onClick={playAnimations}
//               disabled={isPlaying}
//               className={`w-full py-2 rounded text-white ${
//                 isPlaying ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
//               }`}
//             >
//               {isPlaying ? 'Playing...' : 'Play Animations'}
//             </button>
//           </div>

//           <div className="space-y-6">
//             {sprites.map(sprite => (
//               <Workspace
//                 key={sprite.id}
//                 spriteId={sprite.id}
//                 sequence={sequences[sprite.id] || []}
//                 onAddBlock={block => handleAddBlock(sprite.id, block)}
//                 onUpdateBlock={handleUpdateBlock}
//                 spriteName={sprite.type}
//                 position={{ x: sprite.x, y: sprite.y }}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </DndProvider>
//   );
// }

// export default App;








import { useState, useRef, useEffect } from 'react';
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
  { type: 'FOREVER', label: 'Forever', params: {} },
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
  const spritesRef = useRef([]);

  // Update spritesRef with the latest sprites
  useEffect(() => {
    spritesRef.current = sprites;
  }, [sprites]);

  // Helper function to get canvas dimensions
  const getCanvasDimensions = () => {
    const canvas = canvasRef.current;
    return {
      width: canvas ? canvas.clientWidth : window.innerWidth,
      height: canvas ? canvas.clientHeight : window.innerHeight,
    };
  };

  // Function to clear sequence for a specific sprite
  const clearSequence = (spriteId) => {
    setSequences(prev => ({ ...prev, [spriteId]: [] }));
  };

  // Function to delete a specific block from a sequence
  const deleteBlock = (spriteId, blockIndex) => {
    setSequences(prev => ({
      ...prev,
      [spriteId]: prev[spriteId].filter((_, index) => index !== blockIndex)
    }));
  };

  // Add new sprite at the center of the canvas
  const addSprite = (type) => {
    const { width, height } = getCanvasDimensions();

    const newSprite = {
      id: Date.now(),
      type,
      x: width / 2 - 25,
      y: height / 2 - 25,
      direction: 0,
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

  // Check if two sprites collide (50x50 bounding box)
  const checkCollision = (spriteA, spriteB) => {
    const a = { left: spriteA.x, top: spriteA.y, right: spriteA.x + 50, bottom: spriteA.y + 50 };
    const b = { left: spriteB.x, top: spriteB.y, right: spriteB.x + 50, bottom: spriteB.y + 50 };
    return !(
      a.right < b.left ||
      a.left > b.right ||
      a.bottom < b.top ||
      a.top > b.bottom
    );
  };

  // Execute animation sequence with boundary checks
  const executeSequence = async (spriteId, sequence) => {
    for (const block of sequence) {
      const currentSprite = spritesRef.current.find(s => s.id === spriteId);
      if (!currentSprite) continue;

      switch (block.type) {
        case 'MOVE_STEPS': {
          const steps = block.params.steps;
          const angle = (currentSprite.direction * Math.PI) / 180;
          let newX = currentSprite.x + steps * Math.cos(angle);
          let newY = currentSprite.y - steps * Math.sin(angle);
          const { width, height } = getCanvasDimensions();
          if (newX < 0 || newX > width - 50) {
            newX = width / 2 - 25;
            newY = height / 2 - 25;
          }
          updateSprite(spriteId, { x: newX, y: newY });
          await new Promise(resolve => setTimeout(resolve, 500));
          break;
        }
        case 'TURN_DEGREES': {
          const degrees = block.params.degrees;
          updateSprite(spriteId, { direction: currentSprite.direction + degrees });
          await new Promise(resolve => setTimeout(resolve, 500));
          break;
        }
        case 'GO_TO_XY': {
          let { x: targetX, y: targetY } = block.params;
          const { width, height } = getCanvasDimensions();
          if (targetX < 0 || targetX > width - 50) {
            targetX = width / 2 - 25;
            targetY = height / 2 - 25;
          }
          updateSprite(spriteId, { x: targetX, y: targetY });
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
        case 'FOREVER': {
          const blockIndex = sequence.indexOf(block);
          const blocksToRepeat = sequence.slice(0, blockIndex);
          for (let j = 0; j < 1000; j++) {
            await executeSequence(spriteId, blocksToRepeat);
          }
          break;
        }
      }
    }
  };

  // Play all animations concurrently with collision detection
  const playAnimations = async () => {
    setIsPlaying(true);
    const collisionInterval = setInterval(() => {
      const currentSprites = spritesRef.current;
      for (let i = 0; i < currentSprites.length; i++) {
        for (let j = i + 1; j < currentSprites.length; j++) {
          if (checkCollision(currentSprites[i], currentSprites[j])) {
            setSequences(prev => {
              const newSequences = { ...prev };
              const temp = newSequences[currentSprites[i].id];
              newSequences[currentSprites[i].id] = newSequences[currentSprites[j].id];
              newSequences[currentSprites[j].id] = temp;
              return newSequences;
            });
          }
        }
      }
    }, 100);

    try {
      await Promise.all(
        sprites.map(sprite => {
          if (sequences[sprite.id]?.length) {
            return executeSequence(sprite.id, sequences[sprite.id]);
          }
          return Promise.resolve();
        })
      );
    } finally {
      clearInterval(collisionInterval);
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
        <div className="w-96 bg-gray-100 p-4 border-r">
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
        <div className="w-[25%] bg-gray-50 p-4 border-l overflow-y-scroll">
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
                onClearSequence={() => clearSequence(sprite.id)}
                onDeleteBlock={(index) => deleteBlock(sprite.id, index)}
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