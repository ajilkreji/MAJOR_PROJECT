import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import './stylesheets/home.css'
import Footer from './Footer'
import Navbar from './Navbar'
export default function Login() {
  const [phone, setPhone] = useState("+91");
  const [otp, setOtp] = useState("");
  const [placeholder, setPlaceholder] = useState("enter phone number first");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const { login, currentUser } = useAuth();
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const response = async () => {
        await axios.get(
          `http://localhost:5000/student/check/${currentUser.phoneNumber}`
        );
        return response.data.success;
      };
      if (currentUser && response) {
        navigate("/student");
      } else {
        navigate("/student/login");
      }
    } catch (err) {
      console.log("Error at checking user:", err);
    }
  }, [currentUser, navigate]);

  const sendOtp = async () => {
    setPlaceholder('please wait...')
    try {
      const response = await axios.get(
        `http://localhost:5000/student/check/${phone}`
      );
      if (response.data.success) {
        let confirmation = await login(`+${phone}`);
        setUser(confirmation);
        setLoading(false)
        setPlaceholder('enter otp')
      } else {
        setAlert(true);
      }
    } catch (err) {
      console.log("Error in sending OTP", err);
    }
  };

  const verifyOtp = async () => {
    try {
      const data = await user.confirm(otp);
      if (data) {
        navigate("/student");
      } else {
        navigate("/student/login", { replace: true });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar/>
    <div className="container2">
      {alert && <p>Sorry, you're not a student</p>}
    <div className="main">
      <div className="head">
        <h2>Login</h2>
      </div>
    <div className="first-input">
    <input
        type="text"
        placeholder="enter phone number here"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button onClick={sendOtp}>send otp</button>
    </div>

      <div id="recaptcha-container"></div>
      <div className="sec-input">
      <input
        type="text"
        placeholder={placeholder}
        disabled={loading}
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button disabled={loading} onClick={verifyOtp}>verify</button>
    </div>
      </div>
      <Footer/>
    </div>
    </div>
  );
}
