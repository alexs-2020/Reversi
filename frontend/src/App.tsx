import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { GameSettingsProvider, useGameSettings } from './GameSettingsProvider'
import Home from './pages/Home'
import Game from './model/game'
import ConsoleGameView from './view/console_game_view'
import GameController from './controller/game_controller'
import LoginPage from './pages/login';
import SignupPage from './pages/signUp';
import { Routes, Route } from "react-router-dom";


function App() {
  return (<GameSettingsProvider>
      <Routes>
        {/* <Home /> */}
        <Route path="/" element={<Home />} />
        {/*<Route path="/login" element={<LoginPage />} />*/}
        {/*<Route path="/signup" element={<SignupPage />} />*/}
      </Routes>
    </GameSettingsProvider>
  )
}

export default App
