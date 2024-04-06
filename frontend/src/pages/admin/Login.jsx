import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './login.css'
export default function LoginForm() {
  const navigate = useNavigate();
  const [phoneNumber, setphoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState('');
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    if (userId) {
      navigate("/admin");
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!phoneNumber) {
        setAlert("no phonenumber entered");
        if(!password){
          setAlert('No password entered');
        }
      } else {
        const response = await axios.post(
          "http://localhost:5000/admin/api/login",
          {
            phoneNumber,
            password,
          }
        );
        if (response.data.loginStatus) {
          localStorage.setItem("userId", response.data.id);
          window.location.href = "/admin";
        }else{
          setAlert('phonenumber or password is incorrect ')
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-adlogin">
     <div className="box-admin">
     {alert}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Phone Number"
          id="number"
          value={phoneNumber}
          onChange={(e) => setphoneNumber(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
     </div>
      
    </div>
  );
}
