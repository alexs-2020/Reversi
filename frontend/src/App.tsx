import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { GameSettingsProvider } from './GameSettingsProvider';
import Home from './pages/Home';
import Game from './model/game';
import GameController from './controller/game_controller';

function App() {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Create a socket connection
    const newSocket = io('http://localhost:1337');

    // Listen for the connect event to ensure the socket is connected
    newSocket.on('connect', () => {
      console.log('Socket connected and working.');
    });

    // Set the socket state
    setSocket(newSocket);

    // Clean up the socket connection on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <Router>
      {socket && (
        <GameSettingsProvider socket={socket}>
          <Home />
        </GameSettingsProvider>
      )}
    </Router>
  );
}

export default App;
