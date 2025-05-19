
import { DndProvider, useDrag } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Draggable Block Component for motion starts here
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
      className={`p-2 mb-2 bg-blue-400 rounded-lg cursor-move text-white border border-blue-300 hover:bg-blue-500 ${
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
      className={`p-2 mb-2 bg-purple-400 text-white rounded-lg cursor-move border border-purple-300 hover:bg-purple-500 ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      {children}
    </div>
  );
};

export default function SideBar() {
  return (
    <DndProvider backend={HTML5Backend}>
      <main className="w-64 h-screen bg-gray-50 p-4 border-r border-gray-200 overflow-y-auto">

        {/* Motion Section starts here*/}
        <section className="mb-6">

          {/* Heading section starts here */}
          <h3 className="text-sm sm:text-lg font-semibold mb-3 text-gray-600 sm:text-gray-700">Motion</h3>
          {/* Heading section ends here */}

          {/* Move steps block section starts here */}
          <MotionBlock action="move">
            move <input type="number" className="w-12 ml-1 px-1 rounded border" defaultValue="10" /> steps
          </MotionBlock>
          {/* Move steps block section ends here */}

          {/* Turn Block section starts here */}
          <MotionBlock action="turn">
            turn <input type="number" className="w-12 ml-1 px-1 rounded border" defaultValue="15" /> degrees
          </MotionBlock>
          {/* Turn Block section ends here */}

          {/* Go To section block starts here */}
          <MotionBlock action="goto">
            go to x: <input type="number" className="w-12 px-1 rounded border" defaultValue="0" /> y:{" "}
            <input type="number" className="w-12 px-1 rounded border" defaultValue="0" />
          </MotionBlock>
          {/* Go To section block ends here */}

        </section>
        {/* Motion Section ends here*/}

        {/* Looks Section starts here*/}
        <section className="mb-6">
          {/* Heading section starts here */}
          <h3 className="text-sm sm:text-lg font-semibold mb-3 text-gray-600 sm:text-gray-700">Looks</h3>
          {/* Heading section ends here */}

          {/* Say section starts here */}
          <LooksBlock action="say">
            say <input type="text" className="w-20 ml-1 px-1 rounded border" defaultValue="Hello!" /> for{" "}
            <input type="number" className="w-12 ml-1 px-1 rounded border" defaultValue="2" /> seconds
          </LooksBlock>
          {/* Say section ends here */}

          {/* Think section starts here */}
          <LooksBlock action="think">
            think <input type="text" className="w-20 ml-1 px-1 rounded border" defaultValue="Hmm..." /> for{" "}
            <input type="number" className="w-12 ml-1 px-1 rounded border" defaultValue="2" /> seconds
          </LooksBlock>
          {/* Think section ends here */}
        </section>
        {/* Looks Section ends here*/}

        {/* Control section block starts here */}
        <section>
          {/* heading section starts here */}
          <h3 className="text-sm sm:text-lg font-semibold mb-3 text-gray-600 sm:text-gray-700">Controls</h3>
          {/* heading section ends here */}

          <MotionBlock action="repeat">
            repeat <input type="number" className="w-12 ml-1 px-1 rounded border" defaultValue="10" />
          </MotionBlock>
        </section>
      {/* Control section block ends here */}

      </main>


      
    </DndProvider>
  );
}