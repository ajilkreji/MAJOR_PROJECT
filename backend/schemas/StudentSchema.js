const mongoose = require('mongoose');

// Define the schema for the student model
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  fatherName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  institutionName: {
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  travelFrom: {
    type: String,
    required: true
  },
  travelTo: {
    type: String,
    required: true
  }
});

// Create the Mongoose model for the student
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
