import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/Authcontext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../stylesheets/student.css'

export default function InstitutionLogin() {
  const [phone, setPhone] = useState("+91");
  const [otp, setOtp] = useState("");
  const [user, setUser] = useState(null);
  const [placeholder, setPlaceholder] = useState('enter phone number first');
  const { login, currentUser } = useAuth();
  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    try {
      if (currentUser) {
        navigate("/institutions");
      } else {
        navigate("/institutions/login");
      }
    } catch (err) {
      console.log("error at checking user");
    }
  },[currentUser, navigate]);
  const sendOtp = async () => {
    try {
      setPlaceholder('please wait...');
      const response = await axios.get(
        `http://localhost:5000/institution/check/${phone}`
      );
      if (response.data.success) {
        console.log(phone)
        let confirmation = await login(phone);
        if(confirmation){
          setPlaceholder('enter otp');
          setLoading(false)
        }
        setUser(confirmation);
      } else {
        setAlert(true);
        navigate("/institutions/login", { replace: true });
      }
    } catch (err) {
      console.log("Error in sending OTP", err);
    }
  };

  const verifyOtp = async () => {
    try {
      const data = await user.confirm(otp);
      if (data) {
        navigate("/institutions");
      } else {
        navigate("/intitutions/login", { replace: true });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container2">
      <div className="box">
      <input
        type="text"
        placeholder="enter phone number here"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button onClick={sendOtp}>send otp</button>

      <div id="recaptcha-container"></div>
      <input
        type="text"
        placeholder={placeholder}
        value={otp}
        disabled={loading}
        onChange={(e) => setOtp(e.target.value)}
      />
      <br />
      <button onClick={verifyOtp} disabled={loading}>verify</button>
      {alert && <p>Sorry, you're not a Institutioner</p>}
      </div>
    </div>
  );
}
