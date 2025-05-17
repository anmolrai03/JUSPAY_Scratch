const SequenceBlock = ({ block, onChange }) => {
  const handleParamChange = (param, value) => {
    onChange({ ...block, params: { ...block.params, [param]: value } });
  };

  switch (block.type) {
    case 'MOVE_STEPS':
      return (
        <div className="p-2 bg-blue-100 rounded flex items-center gap-2">
          Move
          <input
            type="number"
            value={block.params.steps}
            onChange={(e) => handleParamChange('steps', parseInt(e.target.value))}
            className="w-16 p-1 border rounded"
          />
          steps
        </div>
      );
    case 'TURN_DEGREES':
      return (
        <div className="p-2 bg-blue-100 rounded flex items-center gap-2">
          Turn
          <input
            type="number"
            value={block.params.degrees}
            onChange={(e) => handleParamChange('degrees', parseInt(e.target.value))}
            className="w-16 p-1 border rounded"
          />
          degrees
        </div>
      );
    case 'GO_TO_XY':
      return (
        <div className="p-2 bg-blue-100 rounded flex items-center gap-2">
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
        </div>
      );
    case 'REPEAT':
      return (
        <div className="p-2 bg-blue-100 rounded flex items-center gap-2">
          Repeat
          <input
            type="number"
            value={block.params.times}
            onChange={(e) => handleParamChange('times', parseInt(e.target.value))}
            className="w-16 p-1 border rounded"
          />
          times
        </div>
      );
    case 'SAY_FOR_SECONDS':
      return (
        <div className="p-2 bg-purple-100 rounded flex items-center gap-2">
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
        </div>
      );
    case 'THINK_FOR_SECONDS':
      return (
        <div className="p-2 bg-purple-100 rounded flex items-center gap-2">
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
        </div>
      );
    default:
      return <div>{block.label}</div>;
  }
};

export default SequenceBlock;