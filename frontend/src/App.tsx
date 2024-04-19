import React from 'react'
import { GameSettingsProvider } from './GameSettingsProvider'
import Home from './pages/Home'
import { Routes, Route } from "react-router-dom";
import io from "socket.io-client";

export const socket = io('http://localhost:3001');
function App() {
  return (<GameSettingsProvider>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </GameSettingsProvider>
  )
}

export default App
