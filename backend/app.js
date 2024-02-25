require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const cors = require('cors')
const session = require('express-session')
app.use(express.json())
// Require the router modules
const institutionRouter = require('./routes/institution');
const adminRouter = require('./routes/admin');
const studentRouter = require('./routes/student');
app.use(cookieParser())
app.use(cors())
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}))
// Use the routers in your application
app.use('/institution', institutionRouter);
app.use('/admin', adminRouter);
app.use('/student', studentRouter);

const port = process.env.PORT || 5001;
const IP = '0.0.0.0'
app.listen(port,IP, () => {
  console.log(`Server is running on port ${port}`);
});


try{
  mongoose.connect(process.env.connectionCode,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
).then(
  console.log('connected to database')
)
}catch(error){
    console.log('error in connection');
}
