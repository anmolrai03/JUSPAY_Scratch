import { useDrag } from 'react-dnd';

const Block = ({ block }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'BLOCK',
    item: { block },  // Pass the entire block object
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-2 mb-2 rounded cursor-move ${
        block.type.includes('MOVE') || block.type.includes('TURN') || block.type.includes('GO_TO') 
          ? 'bg-blue-100 border-blue-300' 
          : 'bg-purple-100 border-purple-300'
      } border ${isDragging ? 'opacity-50' : ''}`}
    >
      {block.label}
    </div>
  );
};

export default Block;