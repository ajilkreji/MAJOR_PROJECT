import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Qrcode from "qrcode.react";
import './stylesheets/student.css'

export default function Student() {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currentUser) {
          const response = await axios.get(
            `http://localhost:5000/student/check/${currentUser.phoneNumber}`
          );

          if (response.data.success) {
            navigate("/student");
            setData(response.data.student);
          } else {
           console.log("Error at checking user");
          }
        } else {
          navigate("/student/login", { replace: true });
        }
      } catch (err) {
        console.log("Error at checking user:", err);
      }

      
    };

    // Call the async function
    fetchData();
  }, [currentUser, navigate]);

  return (
    <div className="container">
      <div className="navbar2">
        <button onClick={logout}>Logout</button>
      </div>
      <div className="box">
      <div className="inner-box">
      <img
          src={`https://firebasestorage.googleapis.com/v0/b/auth-development-af655.appspot.com/o/students%2F${data._id}?alt=media&token=01ea9b5b-d02e-4f63-a360-a2a4afff0318`}
          alt="" width={100} height={100}
        />
      <Qrcode value={data._id} size={100} />
      </div>
      <div className="text">
      {<p>Name: {data.name}</p>}
      {<p>Phone Number: {data.phoneNumber}</p>}
      {<p>Father name: {data.fatherName}</p>}
      {<p>Address: {data.address}</p>}
      {<p>Institution: {data.institutionName}</p>}
      {<p>Course: {data.course}</p>}
      {<p>From: {data.travelFrom}</p>}
      {<p>To: {data.travelTo}</p>}
      </div>
      </div>
    </div>
  );
}
