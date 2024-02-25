const express = require('express');
const router = express.Router();
const Supporter = require('../Supports/institutionSupporters');

// Create a new student record
router.post("/student/add", async (req, res) => {
  try {
    let information = req.body;
    let student = await Supporter.createStudent(information);
    res.json({student,success:true});
  } catch (error) {
    console.error("Error creating student:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all students in the institution
router.get("/student/getall", async (req, res) => {
  try {
    let response = await Supporter.getAllStudents();
    res.json({ students: response});
  } catch (error) {
    console.error("Error getting all students:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Find a student by phone number
router.put("/student/find", async (req, res) => {
  const { phoneNumber } = req.body;
  try {
    const student = await Supporter.findStudentByPhoneNumber(phoneNumber);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.json(student);
  } catch (error) {
    console.error("Error finding student:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Check if an institution exists based on phone number
router.get('/check/:phone', async (req, res) => {
  try {
    const { phone } = req.params; // Corrected from req.body to req.params
    const institution = await Supporter.checkInstitution(phone);

    if (institution) {
      res.json({ success: true });
    } else {
      console.log("institution not found");
      res.json({ error: "Institution not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
