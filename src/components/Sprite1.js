// // Sprite.jsx
// import { useRef, useEffect } from 'react';
// import CatSprite from './CatSprite.js';
// import {processCommands} from '../hooks/commands.js'

// export default function Sprite({ sprite, onUpdate, onCollide }) {
//   const elementRef = useRef();

//   const handlePlay = async () => {
//     await processCommands(
//       sprite.commands,
//       sprite.id,
//       onUpdate,
//       elementRef
//     );
//   };

//   useEffect(() => {
//     // Register play handler with parent
//   }, []);

//   return <CatSprite ref={elementRef} {...sprite} />;
// }