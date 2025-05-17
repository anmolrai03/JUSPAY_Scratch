import React from 'react'
import Preview from './Preview/Preview.jsx'
import SpriteDetails from './SpriteDetails/SpriteDetails.jsx'

function Canvas() {
  return (
    <main className='flex flex-row'>
      <Preview />
      <SpriteDetails />
    </main>
  )
}

export default Canvas