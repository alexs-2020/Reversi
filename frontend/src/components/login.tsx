import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {socket} from "../connection/socket";
import {useNavigate} from "react-router-dom";

const Login= () => {
  const [isLogin, setIsLogin] = useState(true);  // Toggle between login and register
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
const [playersOnline, setPlayersOnline] = useState<string[]>([]);
  const [seePlayersOnline, setSeePlayersOnline]=useState(false)
  useEffect(() => {
    socket.on('playerList', (playerList:string[]) => {
      setPlayersOnline(playerList);
    });

    return () => {
      socket.off('playerList');
    };
  }, []);

  const navigate = useNavigate();

  const GoHome = () => {
    window.location.reload();
  };
const handleSubmit = async (event:any) => {
  event.preventDefault();
  console.log("Form submitted with:", { username, password })
  setIsLoading(true);
  setError('');

  const endpoint = isLogin ? 'http://localhost:3001/login' : 'http://localhost:3001/signup';
  const payload = isLogin ? { username, password } : { username, password };

  try {
    const response = await axios.post(endpoint, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    setIsLoading(false);
    console.log(`${isLogin ? 'Login' : 'Registration'} successful:`, response.data);
    socket.emit('connection', { username: username })
    setSeePlayersOnline(true)
  } catch (err:any) {
    setIsLoading(false);
    setError(err.response?.data?.message || err.message);
  }
};
  if (seePlayersOnline) {
  return (
    <div>
      <h3>Players currently online:</h3>
      {playersOnline.length > 0 ? (<div>
            <ul>
              {playersOnline.map((player) => (
                  <button>
                    <li key={player}>{player}</li>
                  </button>
              ))}
            </ul>
            <button>Play</button>
            <button onClick={GoHome}>Exit</button>
          </div>
      ) : (<div>
      <p>There are no players currently online. Would you like to play other modes if not you will continue waiting until someone logs in ?</p>
        <button onClick={GoHome}>Yes</button>
      </div>)}</div>); }


        return (

        <div className="login-container">


        <form style={{display: 'flex', flexDirection: 'column', gap: '20px'}} onSubmit={handleSubmit}>

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
          {isLogin ? 'Login' : 'Register'}
        </button>
        <button onClick={() => setIsLogin(!isLogin)}>
          Switch to {isLogin ? 'Register' : 'Login'}
        </button>
      </form>


      {isLoading && <p>Loading...</p>}
      {error && <p style={{color: 'red'}}>{error}</p>}
    </div>

  );
};

export default Login;

