const express = require('express');
const router = express.Router();
const studentSupporters = require('../Supports/studentSupporters');

router.get('/check/:phone', async (req, res) => {
  let phoneNumber = req.params.phone;
  console.log(phoneNumber);
  try {
    const student = await studentSupporters.checkStudent(phoneNumber);
    if (student) {
      res.json({
        success: true,
        student: student
      });
      console.log("Student exists");
    } else {
      res.json({
        success: false,
        
      }); 
      console.log("Student does not exist");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
    });
  }
});


module.exports = router;