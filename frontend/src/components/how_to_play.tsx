import React, { useEffect, useRef } from 'react'
import '../pages/home.css'
import Game from '../model/game'
import ConsoleGameView from '../view/console_game_view'
import GameController from '../controller/game_controller'
import { useGameSettings } from '../GameSettingsProvider'

interface PlayerProps {
  playerType: string
}

const HowtoPlay: React.FC<PlayerProps> = ({ playerType }) => {
  const gameControllerRef = useRef<GameController | null>(null)
  const { currboardSize, currMove, setShowResp, showResp, setPlay } =
    useGameSettings()

  const handleNavigateHowtoPlay = () => {
    // Toggle the visibility of the response content for the specified playerType
    setShowResp(playerType, !showResp[playerType])
    setPlay(true)
  }

  return (
    <div
      onClick={() => handleNavigateHowtoPlay()}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h1> how to play </h1>

      <p style={{ fontSize: '8px' }}>
        <b>About</b> <br />
        Reversi, also known as Othello, is a classic strategy board game for two
        players. The objective of the game is to have the majority of your color
        discs on the board when the game ends. Here are the basic rules for
        playing Reversi
        <br />
        <b>Game play</b>
        <br />
        Players take turns placing one disc of their color on the board. A
        player must place their disc in such a way that it "sandwiches" at least
        one opponent's disc between their new disc and their already placed
        discs. Sandwiched discs are flipped to the current player's color.
        Players can only place a disc in a position that results in at least one
        opponent's disc being flipped.
        <br />
        <b>How to win</b>
        <br />
        The game ends when the board is full, or when neither player can make a
        legal move. The player with the most discs of their color on the board
        wins.
        <br />
        <b>Click on message to continue...</b>
        <br />
      </p>
    </div>
  )
}
export default HowtoPlay
