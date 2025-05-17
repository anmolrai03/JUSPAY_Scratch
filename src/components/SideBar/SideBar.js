/* Add at the very top of your Sidebar.js file */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'react'

// Keep the rest of your existing imports
import { DndProvider, useDrag } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Rest of your component code remains the same...

// Draggable Block Component
const MotionBlock = ({ action, children }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'motion',
    item: { action },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-2 mb-2 bg-blue-100 rounded-lg cursor-move border border-blue-300 hover:bg-blue-200 ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      {children}
    </div>
  );
};

const LooksBlock = ({ action, children }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'looks',
    item: { action },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-2 mb-2 bg-purple-100 rounded-lg cursor-move border border-purple-300 hover:bg-purple-200 ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      {children}
    </div>
  );
};

export default function Sidebar() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-64 h-screen bg-gray-50 p-4 border-r border-gray-200 overflow-y-auto">
        {/* Motion Section */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-3 text-gray-600">Motion</h3>
          <MotionBlock action="move">
            move <input type="number" className="w-12 ml-1 px-1 rounded border" defaultValue="10" /> steps
          </MotionBlock>
          <MotionBlock action="turn">
            turn <input type="number" className="w-12 ml-1 px-1 rounded border" defaultValue="15" /> degrees
          </MotionBlock>
          <MotionBlock action="goto">
            go to x: <input type="number" className="w-12 px-1 rounded border" defaultValue="0" /> y:{" "}
            <input type="number" className="w-12 px-1 rounded border" defaultValue="0" />
          </MotionBlock>
          <MotionBlock action="repeat">
            repeat <input type="number" className="w-12 ml-1 px-1 rounded border" defaultValue="10" />
          </MotionBlock>
        </div>

        {/* Looks Section */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-3 text-gray-600">Looks</h3>
          <LooksBlock action="say">
            say <input type="text" className="w-20 ml-1 px-1 rounded border" defaultValue="Hello!" /> for{" "}
            <input type="number" className="w-12 ml-1 px-1 rounded border" defaultValue="2" /> seconds
          </LooksBlock>
          <LooksBlock action="think">
            think <input type="text" className="w-20 ml-1 px-1 rounded border" defaultValue="Hmm..." /> for{" "}
            <input type="number" className="w-12 ml-1 px-1 rounded border" defaultValue="2" /> seconds
          </LooksBlock>
        </div>
      </div>
    </DndProvider>
  );
}