import CatSprite from "./utils/CatSprite";
import Character from './utils/Character';
import Airplane from './utils/Airplane'

function Sprite({ x, y, direction, type, message, messageType, messageVisible }) {

  const spriteStyles = {
    position: 'absolute',
    left: `${x}px`,
    top: `${y}px`,
    transform: `rotate(${direction}deg)`,
    width: '50px',
    height: '50px',
  };

  return (
    <div style={spriteStyles} className="text-center">
      {/* {type === 'cat' && '🐱'}
      {type === 'dog' && '🐶'}
      {type === 'bird' && '🐦'} */}

      {type === 'cat' && <CatSprite />}
      {type === 'character' && <Character />}
      {type === 'airplane' && <Airplane />}
      {messageVisible && (
        <div
          className={`absolute -top-8 left-0 p-2 rounded text-sm ${
            messageType === 'say' ? 'bg-white border border-gray-300' : 'bg-gray-200 border border-gray-400'
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default Sprite;