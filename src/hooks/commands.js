// utils/commands.js
async function processCommands(commands, spriteId, updateSprite, elementRef) {
  for (const command of commands) {
    switch (command.type) {
      case 'move':
        await executeMove(command, spriteId, updateSprite, elementRef);
        break;
      // Add cases for other command types
    }
  }
}

async function executeMove(command, spriteId, updateSprite, elementRef) {
  return new Promise((resolve) => {
    updateSprite(spriteId, (prev) => {
      const radians = (prev.rotation * Math.PI) / 180;
      return {
        x: prev.x + command.steps * Math.cos(radians),
        y: prev.y + command.steps * Math.sin(radians),
      };
    });
    
    elementRef.current.addEventListener('transitionend', resolve, { once: true });
  });
}

export {processCommands , executeMove}