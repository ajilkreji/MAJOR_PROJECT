import React, { useState, useEffect } from "react";
import { QrScanner } from "@yudiel/react-qr-scanner";
import "./stylesheets/home.css";
import axios from "axios";
import scannerIcon from './images/icon-scanner.png';
import Navbar from "./Navbar";
import Typewriter from 'typewriter-effect/dist/core';
import Footer from "./Footer";

export default function Home() {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("Scan QRcode");

  useEffect(() => {
    // Initialize Typewriter effect
    new Typewriter('#typewriter', {
      strings: ['"Empowering student mobility <br> with the e-bus concession card."', '"Accelerating student access <br>with the e-bus concession card."'],
      autoStart: true,
    });
  }, []);

  const handleQrCode = async (result) => {
    setVisible(false);
    if (/[^a-zA-Z0-9]/.test(result)) {
      setMessage("Not a Student")
      return
    }
    try {
      const response = await axios.get(
        `http://localhost:5000/student/checkqr/${result}`
      );
      if (response.data.success) {
        setMessage("Its a student");
      } else {
        setMessage("Not a student");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <Navbar />
      <div className="left">
        <div className="inner">
          <h1>Bus Conssession Ticket</h1>
          <p id="typewriter"></p>
        </div>
      </div>
      <div className="side">
        {!visible && (
          <div>
            <img src={scannerIcon} width="50%" alt=""
              onClick={() => setVisible(true)}/>
            {message && <h1 className="message">{message}</h1>}
          </div>
        )}
        {visible && (
          <div className="scanner">
            <QrScanner
            onDecode={(result) => handleQrCode(result)}
            onError={(error) => console.log(error?.message)}
          />
          {visible && <button onClick={() => setVisible(false)}>Close</button>}
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
}
