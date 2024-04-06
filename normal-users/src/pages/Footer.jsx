import React from 'react'
import './stylesheets/home.css'
import {Link }from 'react-router-dom'
export default function Footer() {
  return (
    <footer>
      <div className="innerfooter">
            <Link className="a" to="/">Home</Link>
            <Link className="a" to="about">About</Link>
            <Link className="a" to="student/login">Login</Link>
        </div>
        <br/>
        
        <br/>
        <p>copyright</p>
    </footer>
  )
}
