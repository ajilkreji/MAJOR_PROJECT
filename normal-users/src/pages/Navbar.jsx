import React, { useEffect, useState } from "react";
import "./stylesheets/navbar.css";
import { Link ,useLocation} from "react-router-dom";
export default function Navbar() {
const [hide,setHide] =useState(null)
const location = useLocation() 
useEffect(()=>{
  if(location.pathname ==='/student/login'){
    setHide(true)
}},[location])

  return (
    <div className="navbar">
            <Link className="a" to="/">Home</Link>
            <Link className="a" to="about">About</Link>
           {!hide && (<Link className="a" to="student/login">Login as student</Link>)}
        </div>
  );
}
