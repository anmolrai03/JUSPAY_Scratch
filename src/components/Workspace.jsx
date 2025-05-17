// import { useDrop } from 'react-dnd';

// function Workspace({ spriteId, sequence, setSequence }) {

//   const [{ isOver }, drop] = useDrop(() => ({
//     accept: 'BLOCK',
//     drop: (item) => {
//       if (item.spriteId === spriteId) {
//         setSequence((prev) => ({
//           ...prev,
//           [spriteId]: [...(prev[spriteId] || []), item.type],
//         }));
//       }
//     },
//     collect: (monitor) => ({
//       isOver: !!monitor.isOver(),
//     }),
//   }));

//   return (
//     <div
//       ref={drop}
//       className={`p-2 bg-gray-300 rounded min-h-[100px] mb-2 ${isOver ? 'bg-green-200' : ''}`}
//     >
//       {sequence[spriteId]?.map((blockType, index) => (
//         <div key={index} className="p-2 bg-gray-500 text-white rounded mb-1">
//           {blockType}
//         </div>
//       )) || 'Drop blocks here'}
//     </div>
//   );
// };

// export default Workspace;




// Workspace.jsx
import { useDrop } from 'react-dnd';

function Workspace({spriteId , sequence, onAddBlock, spriteName }){
  const [, drop] = useDrop(() => ({
    accept: 'BLOCK',
    drop: (item) => {
      onAddBlock({
        type: item.type,
        params: getDefaultParams(item.type),
        label: item.label
      });
    },
  }));

  const getDefaultParams = (type) => {
    switch(type) {
      case 'MOVE_STEPS': return { steps: 10 };
      case 'TURN_DEGREES': return { degrees: 15 };
      case 'GO_TO_XY': return { x: 0, y: 0 };
      case 'SAY_FOR_SECONDS': return { text: 'Hello', seconds: 2 };
      default: return {};
    }
  };

  return (
    <div ref={drop} className="p-4 bg-orange-200 rounded min-h-[200px]">
      <h3 className="font-medium mb-2">{spriteName} Workspace </h3>
      {sequence.map((block) => (
        <div key={spriteId} className="p-2 mb-2 bg-gray-100 rounded border">
          {block.label}
        </div>
      ))}
    </div>
  );
};

export default Workspace;