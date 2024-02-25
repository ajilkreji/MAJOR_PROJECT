const mongoose = require("mongoose");
const Admin = require("../schemas/adminSchema");
const bcrypt = require("bcrypt");
const Institution = require("../schemas/institutionSchema");
module.exports = {
  login: async (phoneNumber, enteredpassword) => {
    const admin = await Admin.findOne({ phoneNumber });
    if (admin) {
      const isPasswordValid = await bcrypt.compare(
        enteredpassword,
        admin.password
      );
      if (isPasswordValid) {
        return admin;
      } else {
        return false;
      }
    }
  },
  createAdmin: async (username, phoneNumber, password) => {
    let hashedpassword = await bcrypt.hash(password, 10);
    let createadmin = new Admin({
      username: username,
      phoneNumber: phoneNumber,
      password: hashedpassword,
    });
    createadmin
      .save()
      .then((savedadmin) => {
        console.log("admin saved successfully:", savedadmin);
      })
      .catch((error) => {
        console.error("Error saving admin:", error);
      });
  },
  addInstitution: async (name, phoneNumber) => {
    let createInstitution = new Institution({
      name: name,
      phoneNumber: phoneNumber,
    });
    createInstitution
      .save()
      .then((savedInstitution) => {
        console.log("institution added", savedInstitution);
      })
      .catch((error) => {
        console.error("Error saving institution:", error);
      });
  },
  findInstitution: async () => {
    let result = await Institution.find();
    return result;
  },
  findTheInstitution: async (id) => {
   try{
      let result = await Institution.findById(id);
      return result;
   }
   catch(err){
      console.log(err)
   }
  },
  removeInstitution:async (id)=>{
    let result = await Institution.deleteOne({_id:id});
    return result;
  },
  updateInstitution:async (id,updatedData)=>{
     await Institution.findByIdAndUpdate(id,updatedData);
  },
  findTheRole :async(phone)=>{
    let admin = await Admin.findOne({phoneNumber:phone})
    if(admin){
      return admin
    }
  }
};

