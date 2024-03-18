import React, { ReactNode, useState } from 'react'
import Chips from './chips'
import '../pages/home.css'
import { ImageButton } from '../pages/Home'
import playButton from '../images/play.svg'
import { useGameSettings } from '../GameSettingsProvider'
import HowtoPlay from './how_to_play'
import Board from './board'
import Game from '../model/game'
import GameView from '../view/game_view'
import GameState from '../controller/game_state'
import ConsoleGameView from '../view/console_game_view'
import Move from '../model/move'

const lightcolor: string = '#D4F4FE'
const darkcolor: string = '#07A5C3'
interface PlayerProps {
  type: string
}
const SinglePlayer: React.FC = () => {
  return <h1>Single Player</h1>
}
const MultiPlayer: React.FC = () => {
  return (
    <>
      <h1>Single Player</h1>
      <p>nd player 2 will become the second color </p>
    </>
  )
}

interface LocalPlayerProps {
  playerType: string
}

const LocalPlayer: React.FC<LocalPlayerProps> = ({ playerType }) => {
  const { setStartingPieceColor,game, currMove,setCurrMove,setView, currboardSize,GState,setGState,setGame,setShowResp, showResp } = useGameSettings()
  const [showHowToPlay, setShowHowToPlay] = useState(false)
  const lightcolor = '#D4F4FE'
  const darkcolor = '#07A5C3'
  const handleChipClick = (color: string) => {
    setStartingPieceColor(color)
  }
  const handleShowHowToPlay = () => {

    setGame(new Game(currboardSize)) 
    setGState(new GameState)
    setCurrMove(new Move(-1,-1))
    setView(new ConsoleGameView(game.board, GState,currMove ))
    console.log(game)
    setShowHowToPlay(true)
  }

  return (
    <div className="overlaySetting">
      <div className="overlayBox">
        <div className="overlayInside">
          {showHowToPlay ? (
            <HowtoPlay playerType={playerType} />
          ) : (
            <>
              {playerType === 'singlePlayer' ? (
                <SinglePlayer />
              ) : (
                <MultiPlayer />
              )}
              <h3>Pick Your Color</h3>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '20px',
                  justifyContent: 'center',
                }}
              >
                <Chips
                  color={lightcolor}
                  onClick={() => handleChipClick(lightcolor)}
                />
                <Chips
                  color={darkcolor}
                  onClick={() => handleChipClick(darkcolor)}
                />
              </div>
              <ImageButton
                width={'23.81vw'}
                name={'playButton'}
                height={'5.43vh'}
                alt={'play button'}
                imagesrc={playButton}
                resp={handleShowHowToPlay}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
export default LocalPlayer
