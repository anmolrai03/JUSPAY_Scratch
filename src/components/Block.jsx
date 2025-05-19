// import { useDrag } from 'react-dnd';

// const Block = ({ block }) => {
//   const [{ isDragging }, drag] = useDrag(() => ({
//     type: 'BLOCK',
//     item: { block },  // Pass the entire block object
//     collect: (monitor) => ({
//       isDragging: !!monitor.isDragging(),
//     }),
//   }));

//   return (
//     <div
//       ref={drag}
//       className={`p-2 mb-2 rounded cursor-move ${
//         block.type.includes('MOVE') || block.type.includes('TURN') || block.type.includes('GO_TO') 
//           ? 'bg-blue-100 border-blue-300' 
//           : 'bg-purple-100 border-purple-300'
//       } border ${isDragging ? 'opacity-1' : ''}`}
//     >
//       {block.label}
//     </div>
//   );
// };

// export default Block;



import { useDrag } from 'react-dnd';

const Block = ({ block }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'BLOCK',
    item: { block },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  // Determine block color scheme based on type
  const isMotionBlock = block.type.includes('MOVE') || 
                       block.type.includes('TURN') || 
                       block.type.includes('GO_TO');

  return (
    <div
      ref={drag}
      className={`group relative flex items-center p-3 mb-2 rounded-lg cursor-move transition-all duration-200 ${
        isMotionBlock 
          ? 'bg-gradient-to-r from-blue-100 to-blue-50 border-blue-300 hover:border-blue-400 text-blue-800' 
          : 'bg-gradient-to-r from-purple-100 to-purple-50 border-purple-300 hover:border-purple-400 text-purple-800'
      } border-2 ${
        isDragging ? 'opacity-50 shadow-lg' : 'opacity-100 hover:shadow-md shadow-sm'
      }`}
    >
      {/* Grip handle decoration */}
      <div className={`mr-3 opacity-50 group-hover:opacity-100 transition-opacity ${
        isMotionBlock ? 'text-blue-400' : 'text-purple-400'
      }`}>
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
          />
        </svg>
      </div>

      {/* Block text */}
      <span className="font-medium text-sm tracking-wide">{block.label}</span>

      {/* Hover effect */}
      <div className="absolute inset-0 rounded-lg transition-all duration-200 group-hover:bg-white/20" />
    </div>
  );
};

export default Block;