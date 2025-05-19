import { useState } from 'react';

const SequenceBlock = ({ block, onChange, onDelete }) => {
  const handleParamChange = (param, value) => {
    onChange({ ...block, params: { ...block.params, [param]: value } });
  };

  return (
    <div className="p-2 bg-blue-100 rounded flex items-center gap-2">
      {block.type === 'MOVE_STEPS' && (
        <>
          Move
          <input
            type="number"
            value={block.params.steps}
            onChange={(e) => handleParamChange('steps', parseInt(e.target.value))}
            className="w-16 p-1 border rounded"
          />
          steps
        </>
      )}
      {block.type === 'TURN_DEGREES' && (
        <>
          Turn
          <input
            type="number"
            value={block.params.degrees}
            onChange={(e) => handleParamChange('degrees', parseInt(e.target.value))}
            className="w-16 p-1 border rounded"
          />
          degrees
        </>
      )}
      {block.type === 'GO_TO_XY' && (
        <>
          Go to x:
          <input
            type="number"
            value={block.params.x}
            onChange={(e) => handleParamChange('x', parseInt(e.target.value))}
            className="w-16 p-1 border rounded"
          />
          y:
          <input
            type="number"
            value={block.params.y}
            onChange={(e) => handleParamChange('y', parseInt(e.target.value))}
            className="w-16 p-1 border rounded"
          />
        </>
      )}
      {block.type === 'REPEAT' && (
        <>
          Repeat
          <input
            type="number"
            value={block.params.times}
            onChange={(e) => handleParamChange('times', parseInt(e.target.value))}
            className="w-16 p-1 border rounded"
          />
          times
        </>
      )}
      {block.type === 'FOREVER' && (
        <>
          Forever
        </>
      )}
      {block.type === 'SAY_FOR_SECONDS' && (
        <>
          Say
          <input
            type="text"
            value={block.params.text}
            onChange={(e) => handleParamChange('text', e.target.value)}
            className="w-32 p-1 border rounded"
          />
          for
          <input
            type="number"
            value={block.params.seconds}
            onChange={(e) => handleParamChange('seconds', parseInt(e.target.value))}
            className="w-16 p-1 border rounded"
          />
          seconds
        </>
      )}
      {block.type === 'THINK_FOR_SECONDS' && (
        <>
          Think
          <input
            type="text"
            value={block.params.text}
            onChange={(e) => handleParamChange('text', e.target.value)}
            className="w-32 p-1 border rounded"
          />
          for
          <input
            type="number"
            value={block.params.seconds}
            onChange={(e) => handleParamChange('seconds', parseInt(e.target.value))}
            className="w-16 p-1 border rounded"
          />
          seconds
        </>
      )}
      <button onClick={onDelete} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
    </div>
  );
};

export default SequenceBlock;