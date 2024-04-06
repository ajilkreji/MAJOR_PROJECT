import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-phone-input-2/lib/style.css";
import "./admin-style.css";
import PhoneInput from "react-phone-input-2";
import Modal from "react-modal";
Modal.setAppElement("#root");
export default function Admin() {
  const navigate = useNavigate();
  const [institutions, setInstitutions] = useState([{}]);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedInstitutionId, setSelectedInstitutionId] = useState(null);
  const [updatedName, setupdatedName] = useState("");
  const [updatedPhone, setupdatedPhone] = useState("");
  const [valid, setValid] = useState(true);
  const openModal1 = () => {
    setIsAddModalOpen(true);
  };

  const closeModal1 = () => {
    setIsAddModalOpen(false);
  };
  const openModal2 = (id) => {
    setSelectedInstitutionId(id);
    setIsEditModalOpen(true);
  };

  const closeModal2 = () => {
    setIsEditModalOpen(false);
  };
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/admin/");
        if (response.data.institutions) {
          setInstitutions(response.data.institutions);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (!userId) {
      navigate("/admin/login");
    } else {
      fetchInstitutions();
    }
  }, [userId, navigate]);

  const logout = () => {
    localStorage.removeItem("userId");
    navigate("/admin/login");
  };
  const addInstitution = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/admin/institution",
        {
          name,
          phoneNumber,
        }
      );
      if (response.data.institutions) {
        setInstitutions(response.data.institutions);
        closeModal1();
      }
    } catch (err) {
      console.error(err);
    }
  };
  const deleteInstitution = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/admin/institution/${id}`
      );
      if (response.data.institutions) {
        setInstitutions(response.data.institutions);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const editInstitution = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/admin/institution/${id}`,
        { name: updatedName, phoneNumber: updatedPhone }
      );
      if (response.data.institutions) {
        setInstitutions(response.data.institutions);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const validatePhoneNumber = (phone) => {
    const phoneNumberPattern = /^\d{12}$/;
    return phone === "" || phoneNumberPattern.test(phone);
  };

  return (
    <div className="wrapper">
      <div className="nav">
      Admin page
      {userId && <button onClick={logout}>logout</button>}
      </div>
    
      <div className="inner-section">
      <ul>
        {institutions.map((institution) => (
          <div key={institution.id}>
            <p>{institution.name}</p>
            <p>{institution.phoneNumber}</p>
            <div className="popup">
              <Modal
                className={"modal"}
                isOpen={
                  isEditModalOpen && institution._id === selectedInstitutionId
                }
                onRequestClose={closeModal2}
                contentLabel="My Modal"
              >
                <form onSubmit={() => editInstitution(institution._id)}>
                  editor
                  <input
                    type="text"
                    value={updatedName}
                    required={true}
                    id="name"
                    placeholder="Name"
                    onChange={(e) => {
                      setupdatedName(e.target.value);
                    }}
                  />
                  <PhoneInput
                    country={"in"}
                    onlyCountries={["in"]}
                    value={updatedPhone}
                    id="phone-number"
                    placeholder="Phone Number"
                    inputProps={{
                      required: true,
                    }}
                    onChange={(value) => {
                      setupdatedPhone("+"+value);
                      setValid(validatePhoneNumber(value));
                    }}
                  />
                  <div className="btns">
                    <button onClick={closeModal2}>cancel</button>
                    <button disabled={!valid} type="submit">
                      save
                    </button>
                  </div>
                </form>
                {!valid && <p>please enter a valid phone number </p>}
              </Modal>
            </div>
            <div className="inner-btns">
            <button onClick={() => openModal2(institution._id)}>edit</button>
            <button onClick={() => deleteInstitution(institution._id)}>
              delete
            </button>
            </div>
          </div>
        ))}
      </ul>
      </div>
      <Modal
        className={"modal"}
        isOpen={isAddModalOpen}
        onRequestClose={closeModal1}
        contentLabel="My Modal"
      >
        <form onSubmit={addInstitution}>
          <input
            type="text"
            value={name}
            required={true}
            id="name"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <PhoneInput
            country={"in"}
            onlyCountries={["in"]}
            value={phoneNumber}
            id="phone-number"
            placeholder="Phone Number"
            inputProps={{
              required: true,
            }}
            onChange={(value) => {
              setPhoneNumber("+"+value);
              setValid(validatePhoneNumber(value));
            }}
          />
          <div className="btns">
            <button onClick={closeModal1}>cancel</button>
            <button disabled={!valid} type="submit">
              save
            </button>
          </div>
        </form>
        {!valid && <p>please enter a valid phone number </p>}
        <br />
      </Modal>
      <div className="lastbtn">
      <button onClick={openModal1}>add institution</button>
      </div>
    </div>
  );
}
