import React from 'react'

const date = () => {
    const date = new Date()
    const day = date.getDate()
    const weekday = date.toLocaleDateString('en-US', { weekday: 'long' })
    const month = date.getMonth()
    const year = date.getFullYear()
  return (
    <div>
      <h1 className='text-2xl font-bold'>{weekday}-{day}/{month}/{year}</h1>
    </div>
  )
}

export default date
