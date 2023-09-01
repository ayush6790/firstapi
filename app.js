const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const express = require("express");
const dotenv = require("dotenv");
const ArrayData = require('./arrayData');
// const DB =  "mongodb+srv://ayush6790:bgRxPaloDib33ria@cluster0.kinp4ug.mongodb.net/firstdb?retryWrites=true&w=majority"
const DB = "mongodb://localhost:27017/mydb"

mongoose.connect(DB,{
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>{
  console.log("connected to MongoDB");
}).catch(err=>{
  console.log(err);
})

dotenv.config();
const port = process.env.PORT 


const app = express();
app.use(express.json());

app.post("/arraypost", async (req, res) => {
  const requestData = req.body;

  try {
    const { song, band, year, banger } = requestData; // this {song, ...}

    const newArrayData = new ArrayData({
      song: song, // and the second parameter song should be the same
      band: band,
      year: year,
      banger: banger
    });

    const savedData = await newArrayData.save();

    res.json({
      message: "Data submitted successfully",
      data: savedData,
    });
  } catch (error) {
    console.error("Error in route handler:", error.message);
    console.error(error.stack);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/arraydata", async (req, res) => {
  try {
    const dataArray = await ArrayData.find();

    res.json({
      message: "Data retrieved successfully",
      data: dataArray,
    });
  } catch (error) {
    console.error("Error in route handler:", error.message);
    console.error(error.stack);
    res.status(500).json({ message: "Internal server error" });
  }
});

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
app.get('/', (req, res) => {
  res.status(200).send("Hello World");
})

app.listen(port, () => {
  console.log("Server is running on port:", port);
});


const obj = {
  data: ["demo", "test1", "test2","test3","test4","test5","test6","test7","test8","test9","test0"]
};

app.post("/addData", (request, response) => {
  const requestData = request.body;
  obj.data.push(requestData);
  console.log(obj.data);

  response.json({
    message: "Data submitted successfully my message ",
    data: requestData,
  });
});

app.get("/getData", (req, res) => {
  res.json({
    message: " Data recieved",
    data: obj.data,
  });
});

app.put("/putData/:index", (req, res) => {
  const index = req.params.index;
  const updatedData = req.body;

  if (index >= 0 && index < obj.data.length) {
    obj.data[index] = updatedData;

    res.json({
      message: "Data updated successfully",
      updatedData: index,
      newData: updatedData,
    });
  } else {
    res.status(404).json({
      message: "Invalid syntax",
    });
  }
});

app.delete("/delData/:index", (req, res) => {
  const index = req.params.index;
  if (index >= 0 && index < obj.data.length) {
    const deleteData = obj.data.splice(index, 1);
    res.json({
      message: "Data deleted successfully",
      deletedIndex: index,
      deleteData: deleteData,
    });
  } else {
    res.status(404).json({
      message: "Invalid syntax",
    });
  }
});
//--------------------------------------------------------------------------------------------------------------------------------------------
console.log("-------------------------------------------------------------------------------")


  const array = [];

  for (let i = 0; i < 5; i++) {
    array.push(i);
  }

  // console.log(array);
  
  app.get("/arrayget", (req,res)=>{
    res.json({
      message: "Data recieved",
        data: array,
    })
    console.log(array)
  })

  app.post("/arraypost", (req,res)=>{
    const requestData = req.body;
    array.push(requestData);
    console.log(array)

    res.json({
          message: "Data submitted successfully my message ",
          data: requestData,
        })
  })

  
  app.put("/arrayput/:index", (req,res)=>{
    const index = req.params.index;
    const updatedData = req.body;
    if(index >= 0 && index < array.length) {
      array[index] = updatedData;
      console.log(array)
      res.json({
        message: "Data updated successfully",
        updatedData: index,
        newDataAdded: updatedData,
        newData: array
      })
    } else {
      res.status(404).json({
        message: "Invalid syntax",
      })
    }
  })

  app.delete("/arraydel/:index", (req, res) => {
    const index = req.params.index
    if (index >= 0 && index < array.length) {
      const deleteData = array.splice(index, 1);
      console.log(array)
      console.log(deleteData)

    res.json({
      message: "Data deleted successfully",
      deletedIndex: index,
      deleteData: deleteData,
      newData: array
    })
  }else {
    res.status(404).json({
      message: "Invalid syntax",
    })
  }
})
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// console.log(path.parse("/Users/ayush/Desktop/projects/BackEnd/firstapi/app.js"))

// fs.writeFile("demo.txt", "blahblahblah demo", (err, data) => {
//   console.log("submitted")
// })

// fs.appendFile("demo.txt", " die for you ", (err, data) => {
//   console.log("appended") 
// })

// fs.readFile("demo.txt", "utf8", (err, data) => {
//   console.log("________________________________")
//   console.log(data)
//   console.log("‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾")
// })

// fs.unlink("demo.txt", (err) => {
//   console.log("deleted")
// })
//---------------------------------------------------------------------------------------------------------------------------------------