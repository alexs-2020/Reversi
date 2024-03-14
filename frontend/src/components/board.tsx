import React, { useState } from 'react'
import './board.css'
import { useGameSettings } from '../GameSettingsProvider'

interface SquareProps {
  isDark: boolean
  darkColor: string
  lightColor: string
}

function Square({ isDark, darkColor, lightColor }: SquareProps) {
  const color = isDark ? darkColor : lightColor
  return (
    <div
      className="square"
      style={{ backgroundColor: color, border: `1px solid ${color}` }}
    ></div>
  )
}

interface BoardProps {
  size: number
  darkColor: string
  lightColor: string
}

function Board({ size, darkColor, lightColor }: BoardProps) {
  const {  currboardSize} = useGameSettings();

  function generateBoard() {
    const board = []
    for (let row = 0; row < currboardSize; row++) {
      const rowSquares = []
      for (let col = 0; col < currboardSize; col++) {
        const isDark = (row + col) % 2 === 0
        rowSquares.push(
          <Square
            key={`${row}-${col}`}
            isDark={isDark}
            darkColor={darkColor}
            lightColor={lightColor}
          />,
        )
      }
      board.push(
        <div key={row} className="board-row">
          {rowSquares}
        </div>,
      )
    }
    return board
  }

  return <div className="othello-board">{generateBoard()}</div>
}

export default Board
