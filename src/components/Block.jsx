// import { useDrag } from 'react-dnd';

// const Block = ({ type = '', label, spriteId }) => {
//   const [{ isDragging }, drag] = useDrag(() => ({
//     type: 'BLOCK',
//     item: { type, spriteId },
//     collect: (monitor) => ({
//       isDragging: !!monitor.isDragging(),
//     }),
//   }));

//   // Safer type checking
//   const isMotionBlock = ['MOVE', 'TURN', 'GO_TO', 'REPEAT'].some(t => type.includes(t));

//   return (
//     <div
//       ref={drag}
//       className={`p-2 mb-2 text-white rounded cursor-move ${
//         isMotionBlock ? 'bg-blue-500' : 'bg-purple-500'
//       } ${isDragging ? 'opacity-50' : ''}`}
//     >
//       {label}
//     </div>
//   );
// };

// export default Block;




// Block.jsx
import { useDrag } from 'react-dnd';

const Block = ({ type, label }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'BLOCK',
    item: { type, label },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-2 mb-2 rounded cursor-move ${
        type.includes('MOVE') || type.includes('TURN') || type.includes('GO_TO') 
          ? 'bg-blue-100 border-blue-300' 
          : 'bg-purple-100 border-purple-300'
      } border ${isDragging ? 'opacity-50' : ''}`}
    >
      {label}
    </div>
  );
};

export default Block;