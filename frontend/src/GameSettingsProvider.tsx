import React, { createContext,useEffect, ReactNode, useContext, useState } from 'react'
import Player from './model/player'
import PlayerSymbol from './model/player_symbol'
import GameState from './controller/game_state'
import Move from './model/move' // Import the Move class
import ConsoleGameView from './view/console_game_view'
import Game from './model/game'
function convertBoardStringToArray(boardString: string) {
  const lines = boardString.split('\n')
  const boardArray = []

  for (let i = 1; i < lines.length - 1; i++) {
    const row = lines[i]
      .split(' ')[0]
      .split('')
      .map((cell) => {
        switch (cell) {
          case '.':
            return 0
          case 'B':
            return 1
          case 'W':
            return 2
          default:
            return 3 // Ignore any other characters
        }
      })
      .filter((cell) => cell !== 3) // Remove null values from the array
    boardArray.push(row)
  }

  return boardArray
}
type GameSettingsContextType = {
  startingPieceColor: string
  setStartingPieceColor: (color: string) => void
  nonStartingPieceColor: string
  setNonStartingPieceColor: (color: string) => void
  currboardSize: number
  setBoardSize: (size: number) => void
  showResp: { [key: string]: boolean }
  setShowResp: (id: string, show: boolean) => void
  currPlayer: Player
  SetCurrPlayer: (player: Player) => void
  GState: GameState
  setGState: (GameState: GameState) => void
  boardInfo: number[][]
  setBoardInfo: (info: number[][]) => void
  currMove: Move // Add currMove to the context type
  setCurrMove: (move: Move) => void // Add setCurrMove to the context type
  play: boolean
  setPlay: (bool: boolean) => void
  view:ConsoleGameView
   setView:(view: ConsoleGameView) => void
  game:Game
  setGame:(game:Game)=>void 
}

const GameSettingsContext = createContext<GameSettingsContextType | undefined>(
  undefined,
)

type GameSettingsProviderProps = {
  children: ReactNode
}

export const useGameSettings = () => {
  const context = useContext(GameSettingsContext)
  if (context === undefined) {
    throw new Error(
      'useGameSettings must be used within a GameSettingsProvider',
    )
  }
  return context
}

export const GameSettingsProvider: React.FC<GameSettingsProviderProps> = ({
  children,
}) => {
  const [startingPieceColor, setStartingPieceColor] =
    useState<string>('#416072')
  const [nonStartingPieceColor, setNonStartingPieceColor]=useState<string>('#D4F4FE')
  const [currboardSize, setBoardSize] = useState<number>(8)
  const [showResp, setShowRespState] = useState<{ [key: string]: boolean }>({})
  const [currPlayer, SetCurrPlayer] = useState<Player>(
    new Player(PlayerSymbol.Black, '#D4F4FE'),
  )
  const [boardInfo, setBoardInfo] = useState<number[][]>([])
  const [currMove, setCurrMove] = useState<Move>(new Move(-1,-1)) // Add state for currMove
  const [play, setPlay] = useState<boolean>(false)
  const [GState, setGState] = useState<GameState>(new GameState())
  const [game,setGame]=useState<Game>(new Game(currboardSize))
   const [view,setView]=useState<ConsoleGameView>(new ConsoleGameView(game.board, GState,currMove))

  const setShowResp = (id: string, show: boolean) => {
    setShowRespState((prev) => ({ ...prev, [id]: show }))
  }
  useEffect(() => {
    if (startingPieceColor === '#07A5C3') {
      setNonStartingPieceColor('#D4F4FE');
    } else if (startingPieceColor === '#D4F4FE') {
      setNonStartingPieceColor('#07A5C3');
    }
  }, [startingPieceColor])

  return (
    <GameSettingsContext.Provider
      value={{
        startingPieceColor,
        setStartingPieceColor,
        nonStartingPieceColor,
        setNonStartingPieceColor, 
        currboardSize,
        setBoardSize,
        currPlayer,
        SetCurrPlayer,
        showResp,
        setShowResp,
        boardInfo,
        setBoardInfo,
        GState,
        setGState,
        currMove,
        setCurrMove, // Include currMove and setCurrMove in the context value
        play,
        setPlay,
        game,
        setGame,
        view,
         setView
      }}
    >
      {children}
    </GameSettingsContext.Provider>
  )
}

export default GameSettingsProvider
