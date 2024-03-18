import logo from './logo.svg';
import './App.css';
import Home from './pages/home';
import LoginPage from './pages/login';
import SignupPage from './pages/signUp';
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
    </div>
  );
}

export default App;
