import React from 'react'
import Button from './Button'

const TopRow = ({ onViewAll, title }) => {

  return (
    <div className='flex flex-row items-center justify-between'>
      <h1 className='text-4xl text-neutral-800 font-bold font-montserrat'>{title}</h1>
      <Button title="View All" variant="link" clickEvent={onViewAll} />
    </div>
  )
}

export default TopRow