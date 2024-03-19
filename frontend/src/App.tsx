import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { GameSettingsProvider, useGameSettings } from './GameSettingsProvider'
import Home from './pages/Home'
import Game from './model/game'
import ConsoleGameView from './view/console_game_view'
import GameController from './controller/game_controller'

function App() {
  return (
    <Router>
      <GameSettingsProvider>
        <Home />
      </GameSettingsProvider>
    </Router>
  )
}

export default App
