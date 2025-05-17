import React from 'react'
import Preview from './Preview/Preview.js'
import SpriteDetails from './SpriteDetails/SpriteDetails.js'

function Canvas() {
  return (
    <main className='flex flex-row'>
      <Preview />
      <SpriteDetails />
    </main>
  )
}

export default Canvas