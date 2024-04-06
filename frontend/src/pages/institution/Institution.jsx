import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/Authcontext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { storage } from "../../firebase";
import {ref, uploadBytes,listAll, getDownloadURL} from 'firebase/storage'
import '../stylesheets/institution.css'

export default function Institution() {
  const { currentUser, logout } = useAuth();
  const [visible, setVisible] = useState(false);
  const [valid, setValid] = useState(false);
  const [InstitutionUser, setInstitutionName] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [students, setStudents] = useState([]);
  const [editingStudentId, setEditingStudentId] = useState(null); // Track student id being edited
  const [editedStudentData, setEditedStudentData] = useState({}); // Track edited student data
  const navigate = useNavigate();
  const imageListRef = ref(storage, "students/");

  useEffect(() => {
    listAll(imageListRef)
    .then(async (res) => {
      const uniqueUrls = {}; // Object to track unique URLs

      res.items.forEach(async (item) => {
        const url = await getDownloadURL(item);
        if (!uniqueUrls[url]) { // Check if URL is not already added
          setImageList((prev) => [...prev, url]); // Add unique URL to imageList
          uniqueUrls[url] = true; // Mark URL as added
        }
      });
    })
    .catch((error) => {
      console.error("Error listing images", error);
    });

    async function fetchData() {
      if (currentUser) {
        navigate("/institutions");
        const response = await axios.get(
          "http://localhost:5000/institution/student/getall"
        );
        setStudents(response.data.students);
        const institutionName = await axios.get(`http://localhost:5000/institution/name/${currentUser.phoneNumber}`);
        if(institutionName.data.name){
          setInstitutionName(institutionName.data.name)
        }
      } else {
        navigate("/institutions/login");
      }
    }
    fetchData();
  }, [currentUser, navigate]);

  async function handleLogout() {
    try {
      await logout();
      navigate("/institutions/login");
    } catch {
      console.log("Error logging out");
    }
  }
  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `students/${editingStudentId}`);
    
    uploadBytes(imageRef, imageUpload)
      .then(() => {
        alert("Image Uploaded Successfully");
        setImageUpload(null); // Reset imageUpload state
        // Refresh image list
        listAll(imageListRef)
          .then(async (res) => {
            const uniqueUrls = {};
            res.items.forEach(async (item) => {
              const url = await getDownloadURL(item);
              if (!uniqueUrls[url]) {
                setImageList((prev) => [...prev, url]);
                uniqueUrls[url] = true;
              }
            });
          })
          .catch((error) => {
            console.error("Error listing images", error);
          });
      })
      .catch((error) => {
        console.error("Error uploading image", error);
      });
  };

  async function handleAddStudent(e) {
    e.preventDefault();
  
    const name = e.target.name.value;
    const phoneNumber = e.target.phoneNumber.value;
    const fatherName = e.target.fatherName.value;
    const address = e.target.address.value;
    const institutionName = e.target.institutionName.value;
    const course = e.target.course.value;
    const travelFrom = e.target.travelFrom.value;
    const travelTo = e.target.travelTo.value;
  
    const data = {
      name,
      phoneNumber,
      fatherName,
      address,
      institutionName:InstitutionUser,
      course,
      travelFrom,
      travelTo,
    };
  
    try {
      const response = await axios.post(
        "http://localhost:5000/institution/student/add",
        data
      );
  
      console.log("Response:", response.data);
  
      if (response.data.success) {
        alert("Student added successfully");
        
        // Fetch updated list of students from the server
        const updatedResponse = await axios.get(
          "http://localhost:5000/institution/student/getall"
        );
        setStudents(updatedResponse.data.students); // Update state with new data
  
        setVisible(false);
      } else {
        alert("Error adding student");
      }
    } catch (err) {
      console.error("Error adding student", err);
    }
  }
  async function deleteStudent(studentId) {
    try {
      const response = await axios.delete(
        `http://localhost:5000/institution/student/delete/${studentId}`
      );
  
      console.log("Response:", response.data);
  
      if (response.data.success) {
        // Fetch updated list of students from the server
        const updatedResponse = await axios.get(
          "http://localhost:5000/institution/student/getall"
        );
        setStudents(updatedResponse.data.students); // Update state with new data
        alert("Student deleted successfully");
      } else {
        alert("Error deleting student");
      }
    } catch (err) {
      console.error("Error deleting student", err);
    }
  }
  async function handleEditStudent(e) {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/institution/student/update/${editingStudentId}`,
        editedStudentData
      );

      console.log("Response:", response.data);

      if (response.data.success) {
        alert("Student edited successfully");

        // Fetch updated data from server
        const updatedResponse = await axios.get(
          "http://localhost:5000/institution/student/getall"
        );
        setStudents(updatedResponse.data.students); // Update state with new data

        setEditingStudentId(null); // Reset editing ID
        setEditedStudentData({}); // Reset edited data
        setVisible(false); // Hide the form
      } else {
        alert("Error editing student");
      }
    } catch (err) {
      console.error("Error editing student", err);
    }
  }
  const handleImage =()=>{
    const importRef = ref(storage, `students/${editingStudentId}`)
  }

  // Function to handle editing student
  const editStudent = (student) => {
    setEditingStudentId(student._id);
    setEditedStudentData({
      name: student.name,
      phoneNumber: student.phoneNumber,
      fatherName: student.fatherName,
      address: student.address,
      institutionName: student.institutionName,
      course: student.course,
      travelFrom: student.travelFrom,
      travelTo: student.travelTo,
    });
    setVisible(true);
  };
  const validatePhoneNumber = (phone) => {
    const phoneNumberPattern = /^\+\d{12}$/;
    return phone === "" || phoneNumberPattern.test(phone);
  };
  
  return (
    <div className="container">
      
      <div className="navbar">

      {currentUser && currentUser.phoneNumber ? (
        
        <p> {InstitutionUser} {currentUser.phoneNumber}</p>
        ) : (
          <p>No phone number available</p>
          )}

      <button onClick={handleLogout}>Logout</button>
      </div>

      <br />
<div className="mainbox">
<div className="content">
  <button onClick={()=>setVisible(true)}>add student</button>
  {students.map((student) => (
  InstitutionUser === student.institutionName && (
    <div className="innerbox" key={student._id}>
      <h2>Student</h2>
      {imageList
        .filter((url) => url.includes(student._id))
        .slice(0, 1)
        .map((url) => (
          <div key={url}>
            <img
              src={url}
              style={{ width: "100px", height: "100px" }}
              alt="student image"
            />
          </div>
        ))}
      <p>Name: {student.name}</p>
      <p>Phone number: {student.phoneNumber}</p>
      <p>Father Name: {student.fatherName}</p>
      <p>Address: {student.address}</p>
      <p>Institution Name: {student.institutionName}</p>
      <p>Course: {student.course}</p>
      <p>Travel From: {student.travelFrom}</p>
      <p>Travel To: {student.travelTo}</p>
      <div className="buttons">
        <button onClick={() => editStudent(student)}>Edit</button>
        <button onClick={() => deleteStudent(student._id)}>Delete</button>
      </div>
      <br />
    </div>
  )
))}

</div>
</div>
{/* <div className="fullmain"> */}
      <div className="forminput">
      <div className="innerform">
      {visible && (
      <div className="background">
        <form
          onSubmit={editingStudentId ? handleEditStudent : handleAddStudent}
        >
          {editingStudentId && (
            <div className="imageup">
              <input
                type="file"
                name="file"
                onChange={(e) => setImageUpload(e.target.files[0])}
              />
              <button type ="button" onClick={uploadImage}>upload image</button>
            </div>
          )}

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={editedStudentData.name}
            onChange={(e) =>
              setEditedStudentData({
                ...editedStudentData,
                name: e.target.value,
              })
            }
          />
          <br />

          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number (+91 is mandatory)"
            value={editedStudentData.phoneNumber}
            onChange={(e) => {
              setEditedStudentData({
                ...editedStudentData,
                phoneNumber: e.target.value,
              });
              setValid(validatePhoneNumber(e.target.value));
            }}
          />
          <br />

          <input
            type="text"
            name="fatherName"
            placeholder="Father's Name"
            value={editedStudentData.fatherName}
            onChange={(e) =>
              setEditedStudentData({
                ...editedStudentData,
                fatherName: e.target.value,
              })
            }
          />
          <br />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={editedStudentData.address}
            onChange={(e) =>
              setEditedStudentData({
                ...editedStudentData,
                address: e.target.value,
              })
            }
          />
          <br />

          <input
            type="text"
            name="institutionName"
            placeholder={InstitutionUser}
            disabled="true"
            value={editedStudentData.institutionName}
            onChange={(e) =>
              setEditedStudentData({
                ...editedStudentData,
                institutionName: InstitutionUser,
              })
            }
          />
          <br />

          <input
            type="text"
            name="course"
            placeholder="Course"
            value={editedStudentData.course}
            onChange={(e) =>
              setEditedStudentData({
                ...editedStudentData,
                course: e.target.value,
              })
            }
          />
          <br />

          <input
            type="text"
            name="travelFrom"
            placeholder="Travel From"
            value={editedStudentData.travelFrom}
            onChange={(e) =>
              setEditedStudentData({
                ...editedStudentData,
                travelFrom: e.target.value,
              })
            }
          />
          <br />

          <input
            type="text"
            name="travelTo"
            placeholder="Travel To"
            required={true}
            value={editedStudentData.travelTo}
            onChange={(e) =>
              setEditedStudentData({
                ...editedStudentData,
                travelTo: e.target.value,
              })
            }
          />
          <br />

          <div className="lastbutton">
          <button disabled={!valid} type="submit">
            Submit
          </button>

          <button
            type="button"
            onClick={() => {
              setEditingStudentId(null); // Reset editing ID
              setEditedStudentData({}); // Reset edited data
              setVisible(false); // Hide the form
            }}
          >
            Cancel
          </button>
          </div>
        </form>
        </div>
      )}
      </div>
      </div>
      {/* </div> */}
    <div className="footer">

    </div>
    </div>
  );
}
