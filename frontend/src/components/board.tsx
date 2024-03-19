import React, { useState, useEffect } from 'react'
import './board.css'
import { useGameSettings } from '../GameSettingsProvider'
import Move from '../model/move'
import Chip from './chips'

interface SquareProps {
  isDark: boolean
  darkColor: string
  lightColor: string
  hasChip: boolean
  chipColor?: string
  onClick: React.MouseEventHandler<HTMLDivElement>
}

function Square({
  isDark,
  darkColor,
  lightColor,
  onClick,
  hasChip,
  chipColor = '#000', // Default color for the chip
}: SquareProps) {
  const color = isDark ? darkColor : lightColor
  return (
    <div
      className="square"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color,
        border: `1px solid ${color}`,
      }}
      onClick={onClick}
    >
      {hasChip && <Chip color={chipColor} />}{' '}
      {/* Render the chip if hasChip is true */}
    </div>
  )
}

interface BoardProps {
  size: number
  darkColor: string
  lightColor: string
}

function Board({ size, darkColor, lightColor }: BoardProps) {
  const { currboardSize, setCurrMove, currMove, boardInfo,view,setView,game } = useGameSettings()
  // Function to handle square click
  const handleSquareClick = (row: number, col: number) => {
    const move: Move = new Move(row, col);
    view.setMoveGUI(move, game.curr_player);
    setView(view)
    setCurrMove(move);
  }

  useEffect(() => {
    console.log(currMove)
  }, [view,boardInfo,currMove,game])


function generateBoard() {
  
    const board = []
    for (let row = 0; row < currboardSize; row++) {
      const rowSquares = []
      for (let col = 0; col < currboardSize; col++) {
        let hasChip = false
        let chipColor = '#D4F4FE'
        if (
          game.board.board.length > row &&
          game.board.board[row].length > col &&
          game.board.board[row][col]!== 0
        ) {
          if (game.board.board[row][col] !== 2) {
            chipColor = '#07A5C3'
          }
          hasChip = true
        }
        const isDark = (row + col) % 2 === 0
        rowSquares.push(
          <Square
            key={`${row}-${col}`}
            isDark={isDark}
            darkColor={darkColor}
            lightColor={lightColor}
            hasChip={hasChip}
            chipColor={chipColor}
            onClick={() => handleSquareClick(row, col)}
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
