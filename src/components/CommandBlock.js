// CommandBlock.jsx
import { useDrag } from 'react-dnd';

export default function CommandBlock({ type, data }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'COMMAND',
    item: { type, data },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} className={`command-block ${type}`}>
      {getLabel(type, data)}
    </div>
  );
}