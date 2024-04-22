import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {socket} from "../App";
import {useNavigate} from "react-router-dom";
import Player from "../model/player";
import PlayerSymbol from "../model/player_symbol";

import HowtoPlay from "./how_to_play";
import {useGameSettings} from "../GameSettingsProvider";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001', // Centralized base URL
  headers: {
    'Content-Type': 'application/json'
  }
});

const Login= () => {
  const [isLogin, setIsLogin] = useState(true);  // Toggle between login and register
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [playersOnline, setPlayersOnline] = useState<string[]>([]);
  const [seePlayersOnline, setSeePlayersOnline]=useState(false);
  const [showHowToPlay, setShowHowtoPlay]=useState(false)
    const { currboardSize, currMove, setShowResp, showResp, setPlay, play } =
    useGameSettings()





  const GoHome = () => {
    window.location.reload();
  };
  const startGame=(player1:Player, player2:Player)=>{
      socket.emit('startGame',player2.username)
      setSeePlayersOnline(false);
      setPlay(true);

  };
const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    const endpoint = isLogin ? '/login' : '/signup';
    const payload = { username, password };

    try {
      const response = await axiosInstance.post(endpoint, payload);
      setIsLoading(false);
      console.log(`${isLogin ? 'Login' : 'Registration'} successful:`, response.data);
      socket.emit('addPlayer',  username); // Correct event handling
      setSeePlayersOnline(true);
    } catch (err: any) {
      setIsLoading(false);
      setError(err.response?.data?.message || err.message);
    }
  };
   useEffect(() => {
    // Function to handle new player list data
    const handleNewPlayerList = (players: React.SetStateAction<string[]>) => {
      setPlayersOnline(players);

    };

    // Register the event listener
    socket.on('playerList', handleNewPlayerList);

    // Cleanup function to remove the event listener
    return () => {
      socket.off('playerList', handleNewPlayerList);
    };
  }, [seePlayersOnline]);
   const [playColor, setColor] = useState('black');
   const[opponent, setOpponent] = useState('black');
  const [selectedPlayer, setSelectedPlayer] = useState('');

    // Function to handle player selection
    const togglePlayerColor = (player: string | React.SetStateAction<null>) => {
        if (player !== username) {
            // @ts-ignore
            setSelectedPlayer(player);
        } else {
            console.log("You cannot select yourself as the opponent.");
        }
    };
    const ShowSeePlayerOnline = () => (
    <div>
      <h3>Players currently online:</h3>
      <ol>
        {playersOnline.map((player) => (
          <li key={player} onClick={() => togglePlayerColor(player)}
              style={{
                  color: selectedPlayer === player ? 'blue' : 'black',
                  cursor: 'pointer'
              }}>
              {player}
          </li>
        ))}
      </ol>
      {playersOnline.length > 1 ? (
        <div style={{ display: "flex", alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={() => startGame(new Player(PlayerSymbol.Black,username), new Player(PlayerSymbol.White, selectedPlayer))}>Play</button>
          <button onClick={GoHome}>Exit</button>
        </div>
      ):(
            <div>
              <p>
                There are no players currently online. Would you like to play
                other modes if not you will continue waiting until someone logs
                in?
              </p>
              <button onClick={GoHome}>Yes</button>
            </div>
          )

      }
    </div>
  );

 return (
  <div>
    {seePlayersOnline? ShowSeePlayerOnline() : (
      <div className="login-container">
        <form
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLogin ? "Login" : "Register"}
          </button>
          <button onClick={() => setIsLogin(!isLogin)}>
            Switch to {isLogin ? "Register" : "Login"}
          </button>
        </form>
        {isLoading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    )}
  </div>
);}

export default Login;

