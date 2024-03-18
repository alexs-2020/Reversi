import React from "react";
import { Link } from "react-router-dom";
// import { useContext } from "react";                     // <== IMPORT 
// import { AuthContext } from "../context/auth.context";  // <== IMPORT
// import { useEffect } from "react";
import Navbar from "../components/navbar";


function Home() {
  return ( 
    <div>
        <Navbar />
        <Link to="/login">
        <h1>To Loguin </h1></Link>
        <h2>your score</h2>
    </div>
  );}
  
export default Home;



// <span>{user && user.username}</span>
