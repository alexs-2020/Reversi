import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";




// const API_URL = "http://localhost:5005";


function LoginPage(props) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleUserName = (e) => setUserName(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { username, password };
 
    axios.post(`http://localhost:3001/login`, requestBody)
		.then(response => {
            // redirect wherever
			navigate('/') //feed
				
			})
			
  };
  
  return (
    <div className="LoginPage">
      <h2>Login</h2>

      <form onSubmit={handleLoginSubmit}>
        <label>Username:</label>
        <input 
          type="username"
          name="username"
          value={username}
          onChange={handleUserName}
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <button type="submit">Login</button>
      </form>
      { errorMessage && <p className="error-message">{errorMessage}</p> }

      <p>Don't have an account yet?</p>
      <Link to={"/signup"}>Sign Up</Link>
    </div>
  )
}

export default LoginPage;
