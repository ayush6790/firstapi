const express = require("express");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt")
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

// require('./db');

// const mongoose = require ('mongoose')
// const mongoDB = "mongodb://localhost:27017/SchoolPractice"


// mongoose.connect(mongoDB, (err)=>{
//   if(err) console.log("unable: ${err}")
//   else
//     console.log("mongoDB is connected")
// })

dotenv.config();

const app = express();
app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log("server is running on port:", process.env.PORT);
});

app.get("/status", (request, response) => {
  const status = {
    Status: "Running",
  };

  response.send(status);
});
app.post("/submit", (request, response) => {
    // Assuming you want to handle JSON data sent in the request body
    const requestData = request.body;
    console.log(requestData);

    // Perform processing or save data to a database
    // For example, you can respond with the submitted data
    response.json({
      message: "Data submitted successfully",
      data: requestData,
    });
  });

  app.delete("/submit", (request, response) =>
  {
    response.json({
      message:"Deleted Successfully",
      dateNow: Date.now().toLocaleString
    })
  })

bcrypt.hash(myPlaintextPassword, saltRounds, function(err,hash){
  console.log(`print my hash: ${hash}`)
  console.log("-------------------------------line break----------------------------------")

})
bcrypt.hash(someOtherPlaintextPassword, saltRounds, function(err,hash){
  console.log(`print my hash: ${hash}`)
  console.log("-------------------------------line break----------------------------------")

})
/*
-> Why is async mode recommended over sync mode?
->   We recommend using async API if you use bcrypt on a server.
      Bcrypt hashing is CPU intensive which will cause the sync APIs to block the event loop and prevent your 
      application from servicing any inbound requests or events. The async version uses a thread pool which does 
      not block the main event loop.
*/