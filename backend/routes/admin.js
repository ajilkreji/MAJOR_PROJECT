const express = require("express");
const router = express.Router();
//const Admin = require('../schemas/adminSchema');
const supporter = require("../Supports/adminSupporters");

router.get("/", async (req, res) => {
  let institutions = await supporter.findInstitution();
  if (institutions) {
    res.json({ institutions });
  }
});
/* router.get("/login", (req, res) => {
  console.log(req.session.loggedIn);
  if (req.session.loggedIn) {
    res.json({ success: true });
  }
}); */
router.get("/create", async (req, res) => {
  res.send("hey");
  let username = "hello";
  let phoneNumber = 1111;
  let password = "12345";
  supporter.createAdmin(username, phoneNumber, password);
});

router.post("/api/login", async (req, res) => {
  let result = req.body;
  let admin = await supporter.login(result.phoneNumber, result.password);
  if (admin) {
    let id = admin.id;
    res.json({ loginStatus: true, id });
  } else {
    res.json({ loginStatus: false });
  }
});
router.post("/institution", async (req, res) => {
  let result = req.body;
  await supporter.addInstitution(result.name, result.phoneNumber);
  let institutions = await supporter.findInstitution();
  if (institutions) {
    res.json({ institutions });
  } else {
    res.json("nothing");
  }
});
router.delete("/institution/:id", async (req, res) => {
  let id = req.params.id;
   try{
    let institution = await supporter.findTheInstitution(id)
    if(institution){

      await supporter.removeInstitution({_id:institution._id});
    }
    let institutions = await supporter.findInstitution();
    res.json({institutions})
   }catch(err){
    console.log(err)
   }
  
});
router.put('/institution/:id',async(req,res)=>{
  const id = req.params.id;
  const updatedData = req.body;
  try{
  await supporter.updateInstitution(id,updatedData)
  let institutions = await supporter.findInstitution();
    res.json({institutions})
  }catch(err){
    console.log(err)
  }
})

module.exports = router;
