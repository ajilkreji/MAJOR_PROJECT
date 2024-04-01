const Institution = require("../schemas/institutionSchema");
const Student = require('../schemas/StudentSchema');

module.exports = {
  findTheRole: async (phone) => {
    let institution = await Institution.findOne({ phoneNumber: phone });
    return institution;
  },

  createStudent: async (information) => {
    let newStudent = new Student(information);
    await newStudent.save();
    return newStudent;
  },

  getAllStudents: async () => {
    try {
      const allStudents = await Student.find();
      return allStudents;
    } catch (error) {
      console.error("Error getting all students:", error);
      throw error; // Re-throw the error to be caught by the calling function or middleware
    }
  },

  findStudentByPhone: async (phone) => {
    let student = await Student.findOne({ phoneNumber: phone });
    return student;
  },

  checkInstitution: async (phone) => {
    let institution = await Institution.findOne({ phoneNumber: phone });
    return institution;
  },
  updateStudent: async (studentId, updatedData) => {
    try {
      const updatedStudent = await Student.findByIdAndUpdate(studentId, updatedData, { new: true });
      return updatedStudent;
    } catch (error) {
      console.error("Error updating student:", error);
      throw error; // Re-throw the error to be caught by the calling function or middleware
    }
  },
  deleteStudentById: async (studentId) => {
    try {
      // Find the student by ID and delete
      const deletedStudent = await Student.findByIdAndDelete(studentId);
      if (!deletedStudent) {
        throw new Error("Student not found");
      }
      return deletedStudent;
    } catch (error) {
      console.error("Error deleting student:", error);
      throw error; // Re-throw the error to be caught by the calling function or middleware
    }
  }
};
