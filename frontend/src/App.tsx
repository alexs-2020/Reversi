import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { GameSettingsProvider } from './GameSettingsProvider';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <GameSettingsProvider>
        <Home />
      </GameSettingsProvider>
    </Router>
  );
}

export default App;