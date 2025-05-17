// // App.jsx (updated)
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// import { SideBar, Canvas, ScriptArea } from './components';
// import SpriteDetails from './components/Canvas/SpriteDetails/SpriteDetails';
// import { useState } from 'react';

// export default function App() {
//   const [sprites, setSprites] = useState([]);
//   const [activeSprite, setActiveSprite] = useState(null);

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <main className="h-screen flex">
//         {/* Left Sidebar */}
//         <div className="w-64 border-r">
//           <SideBar />
//         </div>

//         {/* Main Content Area */}
//         <div className="flex-1 flex">
//           {/* Canvas Preview Area */}
//           <div className="flex-1 border-r p-4">
//             <Canvas sprites={sprites} activeSprite={activeSprite} />
//           </div>

//           {/* Right Panel (Script Area + Sprite Details) */}
//           <div className="w-96 flex flex-col border-l">
//             <div className="flex-1 p-4 border-b">
//               <ScriptArea sprite={activeSprite} />
//             </div>
//             <div className="flex-1 p-4">
//               <SpriteDetails 
//                 sprites={sprites}
//                 activeSprite={activeSprite}
//                 onAddSprite={newSprite => setSprites([...sprites, newSprite])}
//                 onSelectSprite={setActiveSprite}
//               />
//             </div>
//           </div>
//         </div>
//       </main>
//     </DndProvider>
//   );
// }









// import { useState } from 'react';
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// import Block from './components/Block.jsx';
// import Sprite from './components/Sprite.jsx';
// import Workspace from './components/Workspace.jsx';

// const motionBlocks = [
//   { type: 'MOVE_STEPS', label: 'Move 10 steps', params: { steps: 10 } },
//   { type: 'TURN_DEGREES', label: 'Turn 15 degrees', params: { degrees: 15 } },
//   { type: 'GO_TO_XY', label: 'Go to x: 0 y: 0', params: { x: 0, y: 0 } },
//   { type: 'REPEAT', label: 'Repeat', params: { times: 1 } },
// ];

// const looksBlocks = [
//   { type: 'SAY_FOR_SECONDS', label: 'Say \'Hello\' for 2 seconds', params: { text: 'Hello', seconds: 2 } },
//   { type: 'THINK_FOR_SECONDS', label: 'Think \'Hmm\' for 2 seconds', params: { text: 'Hmm', seconds: 2 } },
// ];

// function App() {
//   const [sprites, setSprites] = useState([]);
//   const [sequences, setSequences] = useState({});
//   const [isPlaying, setIsPlaying] = useState(false);

//   // Add a new sprite with initial message properties
//   const addSprite = (type) => {
//     const newSprite = {
//       id: Date.now(),
//       type,
//       x: 100,
//       y: 100,
//       direction: 90,
//       message: '',
//       messageType: '',
//       messageVisible: false,
//     };
//     setSprites((prev) => [...prev, newSprite]);
//     setSequences((prev) => ({ ...prev, [newSprite.id]: [] }));
//   };

//   // Execute animation sequence for a sprite
//   const executeSequence = async (spriteId, sequence, updateSprite) => {
//     for (const block of sequence) {
//       if (block.type === 'MOVE_STEPS') {
//         const steps = block.params.steps;
//         const sprite = sprites.find((s) => s.id === spriteId);
//         const angle = (sprite.direction * Math.PI) / 180;
//         const newX = sprite.x + steps * Math.cos(angle);
//         const newY = sprite.y - steps * Math.sin(angle);
//         updateSprite(spriteId, { x: newX, y: newY });
//         await new Promise((resolve) => setTimeout(resolve, 500));
//       } else if (block.type === 'TURN_DEGREES') {
//         const degrees = block.params.degrees;
//         const sprite = sprites.find((s) => s.id === spriteId);
//         updateSprite(spriteId, { direction: sprite.direction + degrees });
//         await new Promise((resolve) => setTimeout(resolve, 500));
//       } else if (block.type === 'GO_TO_XY') {
//         const { x, y } = block.params;
//         updateSprite(spriteId, { x, y });
//         await new Promise((resolve) => setTimeout(resolve, 500));
//       } else if (block.type === 'SAY_FOR_SECONDS') {
//         const { text, seconds } = block.params;
//         updateSprite(spriteId, { message: text, messageType: 'say', messageVisible: true });
//         await new Promise((resolve) => setTimeout(resolve, seconds * 1000));
//         updateSprite(spriteId, { messageVisible: false });
//       } else if (block.type === 'THINK_FOR_SECONDS') {
//         const { text, seconds } = block.params;
//         updateSprite(spriteId, { message: text, messageType: 'think', messageVisible: true });
//         await new Promise((resolve) => setTimeout(resolve, seconds * 1000));
//         updateSprite(spriteId, { messageVisible: false });
//       } else if (block.type === 'REPEAT') {
//         const times = block.params.times;
//         const blockIndex = sequence.indexOf(block);
//         if (blockIndex > 0) {
//           const prevBlock = sequence[blockIndex - 1];
//           for (let j = 0; j < times; j++) {
//             await executeSequence(spriteId, [prevBlock], updateSprite);
//           }
//         }
//       }
//     }
//   };

//   // Update sprite properties
//   const updateSprite = (spriteId, updates) => {
//     setSprites((prev) =>
//       prev.map((sprite) =>
//         sprite.id === spriteId ? { ...sprite, ...updates } : sprite
//       )
//     );
//   };

//   // Play animations for all sprites sequentially
//   const playAnimations = async () => {
//     setIsPlaying(true);
//     for (const sprite of sprites) {
//       if (sequences[sprite.id]?.length) {
//         await executeSequence(sprite.id, sequences[sprite.id], updateSprite);
//       }
//     }
//     setIsPlaying(false);
//   };

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div className="flex h-screen">

//         {/* Left Sidebar: Blocks */}
//         <div className="w-1/4 bg-gray-200 p-4 overflow-y-auto">
//           <h2 className="text-lg font-bold text-blue-700">Motion</h2>
//           {motionBlocks.map((block) => (
//             <Block key={block.type} block={block} label={block.label}/>
//           ))}
//           <h2 className="text-lg font-bold text-purple-700 mt-4">Looks</h2>
//           {looksBlocks.map((block) => (
//             <Block key={block.type} block={block} label={block.label}/>
//           ))}
//         </div>



//         {/* Right Panel: Sprite Management */}
//         <div className="w-1/4 bg-gray-200 p-4 border-l">
//           <h2 className="text-lg font-bold">Sprites</h2>
//           <button
//             onClick={() => addSprite('cat')}
//             className="bg-green-500 text-white p-2 rounded mt-2 mr-2"
//           >
//             Add Cat
//           </button>
//           <button
//             onClick={() => addSprite('dog')}
//             className="bg-green-500 text-white p-2 rounded mt-2 mr-2"
//           >
//             Add Dog
//           </button>
//           <button
//             onClick={() => addSprite('bird')}
//             className="bg-green-500 text-white p-2 rounded mt-2"
//           >
//             Add Bird
//           </button>
//           <button
//             onClick={playAnimations}
//             disabled={isPlaying}
//             className={`p-2 rounded mt-4 w-full text-white ${
//               isPlaying ? 'bg-gray-400' : 'bg-blue-500'
//             }`}
//           >
//             {isPlaying ? 'Playing...' : 'Play'}
//           </button>
//           <div className="mt-4">
//             {sprites.map((sprite) => (
//               <div key={sprite.id} className="mb-4">
//                 <div className="p-2 bg-white rounded mb-2">
//                   {sprite.type} (x: {Math.round(sprite.x)}, y: {Math.round(sprite.y)})
//                 </div>
//                 <Workspace spriteId={sprite.id} sequence={sequences} setSequence={setSequences} />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Center Canvas */}
//         <div className="flex-1 bg-gray-100 relative">
//           {sprites.map((sprite) => (
//             <Sprite key={sprite.id} {...sprite} />
//           ))}
//         </div>

        
//       </div>
//     </DndProvider>
//   );
// }

// export default App;








import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Block from './components/Block';
import Sprite from './components/Sprite';
import Workspace from './components/Workspace';

const motionBlocks = [
  { type: 'MOVE_STEPS', label: 'Move 10 steps', params: { steps: 10 } },
  { type: 'TURN_DEGREES', label: 'Turn 15 degrees', params: { degrees: 15 } },
  { type: 'GO_TO_XY', label: 'Go to x: 0 y: 0', params: { x: 0, y: 0 } },
  { type: 'REPEAT', label: 'Repeat', params: { times: 1 } },
];

const looksBlocks = [
  { type: 'SAY_FOR_SECONDS', label: 'Say "Hello" for 2 seconds', params: { text: 'Hello', seconds: 2 } },
  { type: 'THINK_FOR_SECONDS', label: 'Think "Hmm" for 2 seconds', params: { text: 'Hmm', seconds: 2 } },
];

function App() {
  const [sprites, setSprites] = useState([]);
  const [sequences, setSequences] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);

  // Add new sprite
  const addSprite = (type) => {
    const newSprite = {
      id: Date.now(),
      type,
      x: 100,
      y: 100,
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
          if (blockIndex > 0) {
            const prevBlock = sequence[blockIndex - 1];
            for (let j = 0; j < times; j++) {
              await executeSequence(spriteId, [prevBlock]);
            }
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
      [spriteId]: [...(prev[spriteId] || []), block]
    }));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen">
        {/* Left Sidebar - Blocks */}
        <div className="w-64 bg-gray-100 p-4 border-r">
          <h2 className="text-lg font-bold text-blue-600 mb-4">Motion Blocks</h2>
          {motionBlocks.map(block => (
            <Block
              key={block.type}
              type={block.type}
              label={block.label}
            />
          ))}
          
          <h2 className="text-lg font-bold text-purple-600 mt-6 mb-4">Looks Blocks</h2>
          {looksBlocks.map(block => (
            <Block
              key={block.type}
              type={block.type}
              label={block.label}
            />
          ))}
        </div>

        {/* Center Canvas */}
        <div className="flex-1 bg-white relative">
          {sprites.map(sprite => (
            <Sprite
              key={sprite.id}
              {...sprite}
            />
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
                Add airplane
              </button>
              <button
                onClick={() => addSprite('character')}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                Add character
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