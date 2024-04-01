const Student = require('../schemas/StudentSchema');

module.exports = {

    checkStudent: async (phone) => {
        let student = await Student.findOne({ phoneNumber: phone });
        return student;
    },
    checkStudentByQrCode: async (id) => {
        let student = await Student.findOne({ _id: id });
        return student;
    }
}
