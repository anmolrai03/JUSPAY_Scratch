import { useDrop } from 'react-dnd';
import SequenceBlock from './SequenceBlock';

const Workspace = ({ spriteId, sequence, onAddBlock, onUpdateBlock, spriteName, position }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'BLOCK',
    drop: (item) => {
      onAddBlock(item.block);  // Add the block to the sequence
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div className="bg-gray-200 p-4 rounded shadow">
      <h3 className="text-md font-bold mb-2">{spriteName} (x: {Math.round(position.x)}, y: {Math.round(position.y)})</h3>
      <div
        ref={drop}
        className={`min-h-[100px] p-2 rounded ${isOver ? 'bg-green-100' : 'bg-white'}`}
      >
        {sequence.length === 0 ? (
          <p className="text-gray-500">Drop blocks here</p>
        ) : (
          sequence.map((block, index) => (
            <SequenceBlock
              key={index}
              block={block}
              onChange={(updatedBlock) => onUpdateBlock(spriteId, index, updatedBlock)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Workspace;