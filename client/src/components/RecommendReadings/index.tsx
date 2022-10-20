import React from 'react'

import { COVER_URL } from 'utils/configs'

const data = [
  '9789639307223',
  '9780670813025',
  '9781501110344',
  '9781936594221',

]

const RecommendReadings = () => {

  const renderItem = data.map((isbn) => {
    const thumbnail = `${COVER_URL}${isbn}-M.jpg`
    return (
      <div 
        key={isbn}
        className="flex flex-col items-center"
      >
        <img 
          src={thumbnail} 
          alt="Book Cover" 
          className='max-w-[100px]'
        />
      </div>
    )
  })

  return (
    <div className='w-full flex gap-2 my-2'>
      {renderItem}
    </div>
  )
}

export default RecommendReadings