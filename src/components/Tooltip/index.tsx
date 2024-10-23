import React, { useEffect, useState } from 'react'

interface TooltipProps {
  text: string
  e: React.MouseEvent
}

export default function Tooltip({ text, e }: TooltipProps) {
  const [position, setPosition] = useState({ top: 0, left: 0 })

  useEffect(() => {
    handleMouseEnter()
  })

  const handleMouseEnter = () => {
    // Calculate the position based on mouse coordinates
    const tooltipX = e.clientX + 10 // Offset to the right
    const tooltipY = e.clientY + 10 // Offset to the bottom
    setPosition({ top: tooltipY, left: tooltipX })
  }

  return (
    <div className='absolute z-40 px-2 p-1 flex justify-center items-center bg-black text-white rounded-sm'>
      <span
        className='text-sm'
        style={{ top: position.top, left: position.left }}
      >
        {text}
      </span>
    </div>
  )
}
