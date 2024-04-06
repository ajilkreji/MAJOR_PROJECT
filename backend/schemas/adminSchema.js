const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username:{
    type:String,
    required:[true,'Please add a user name'],
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports= Admin