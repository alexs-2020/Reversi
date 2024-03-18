import React, { useState } from 'react'

interface ChipsProps {
  color?: string
  id?: string
  onClick?: () => void // Add the onClick property
}
function Chip({ color, onClick }: ChipsProps) {
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = () => {
    setIsClicked(true)
    if (onClick) {
      onClick()
    }
    // Remove the shadow effect after a short delay
    setTimeout(() => setIsClicked(false), 200)
  }

  return (
    <div onClick={handleClick} className={isClicked ? 'chip-shadow' : ''}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="5.19vh"
        height="5.19vh"
        viewBox="0 0 100 100"
      >
        <circle cx="50" cy="50" r="45" fill="#07A5C3" />
        <circle cx="50" cy="50" r="40" fill="#416072" />
        <circle cx="50" cy="50" r="35" fill={color} />
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          stroke="#fff"
          strokeWidth="5"
        />
      </svg>
    </div>
  )
}
export default Chip
