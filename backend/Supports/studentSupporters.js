const Student = require('../schemas/StudentSchema');

module.exports = {

    checkStudent: async (phone) => {
        let student = await Student.findOne({ phoneNumber: phone });
        return student;
    }
}
