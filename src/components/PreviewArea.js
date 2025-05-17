// import React from "react";
// import CatSprite from "./CatSprite";

// export default function PreviewArea() {
//   return (
//     <div className="flex-none h-full overflow-y-auto p-2">
//       <CatSprite />
//     </div>
//   );
// }

import React from 'react';
import Sprite from './Sprite.js'
export default function PreviewArea({ sprites }) {
  return (
    <div className="preview-area">
      {sprites.map(sprite => (
        <Sprite
          key={sprite.id}
          sprite={sprite}
          onUpdate={updateSprite}
          onCollide={handleCollision}
        />
      ))}
    </div>
  );
}