const express = require("express");
const cors = require("cors");
require('./db/config');
const User = require("./db/Users");
const Blood = require("./db/Blood-Donation");
const app = express();
const exceljs = require('exceljs');
const xlsx = require('xlsx');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const multer = require('multer');
const path = require('path');
// const { error } = require("console");
const csv = require('csvtojson');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.json());
app.use(cors());
app.use(fileUpload());

// import fs from 'fs';

// app.post('/uploadAll', async(req,resp)=>{
//     let xlFile = xlsx.readFile("D:\BloodManagement\Blood-Management-System\blood-management-backend\public\data.xlsx");


//     let sheet = xlFile.Sheets[xlFile.SheetNames[0]]
    
//     let P_JSON = xlsx.utils.sheet_to_json(sheet);

//     await Blood.insertMany(P_JSON).then((result:any)=>{
//        if(result.length > 0){
//         resp.send(status: 200, "message")
//        }
//     })
// })


// var upload = multer({dest: "uploads/"});

// app.post('/uploadsAll', upload.single('file'), (req,res)=>{
//   try{
//     if(req.file?.filename == null || req.file?.filename == 'undefined'){
//     res.status(400).json("No File");
//     }else{
//      var filePath = 'uploads/'+ req.file.filename

//      const excelData = excelToJson({
//          sourceFile: filePath,
//          header: {
//           rows: 1,
//          },
//          columnToKey:{
//           "*":"{{columnHeader}}",
//          },
//      });
//      fs.remove(filePath)

//      res.status(200).json(excelData)
//     }
//   }catch(error){
//     res.status(500)
//   }
// })


app.post("/register", async(req,resp)=>{
   let user = new User(req.body);
   let result = await user.save();
   result = result.toObject();
   delete result.password;
   resp.send(result);
   console.log(result);
    
})

app.post('/login', async(req,resp)=>{
  if(req.body.email && req.body.password){
   let user = await User.findOne(req.body).select("-password");
   if(user){
      resp.send(user)
   }else{
      resp.send({result:"No User Found"})
   }
  }else{
   resp.send({result:"No User Found"})
  }
})

app.post('/blood-donation', async(req,resp)=>{
   let blood = new Blood(req.body);
   let result = await blood.save();
   resp.send(result);
})



app.get('/donor', async(req,resp)=>{
   try {
      let blood = await Blood.find();
      if (blood.length > 0) {
        resp.send(blood);
      } else {
        resp.send({ result: "No record found" });
      }
    } catch (error) {
      console.error(error);
      resp.status(500).send({ error: "Internal server error" });
    }
})

app.delete('/donors/:id', async (req, resp) => {
   try {
     const result = await Blood.deleteOne({ _id: req.params.id });
     resp.send(result);
   } catch (error) {
     resp.status(500).send(error);
   }
 });

app.get('/Donors/:id', async (req, resp) => {
  try {
    let result = await Blood.findOne({ _id: req.params.id });
    if (result) {
      resp.send(result);
    } else {
      resp.status(404).send("No record found");
    }
  } catch (error) {
    resp.status(500).send("Internal Server Error");
  }
});


app.put('/Donors-update/:id', async (req, resp) => {
  try {
    const result = await Blood.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    resp.send(result);
  } catch (error) {
    console.error('Error updating donor:', error);
    resp.status(500).send('Internal server error');
  }
});


app.get('/export', async (req, res) => {
  try {
    // Retrieve data from MongoDB
    const result = await Blood.find();

    
    // Format data (example: convert to array of arrays)
    const formattedData = [
      ['Name', 'Email', 'Age', 'Blood Group', 'Unit', 'Disease'], // Add headings as the first element
      ...result.map(item => [item.name, item.email, item.age, item.bloodGroup, item.unit, item.disease])
    ];

    // Generate Excel workbook
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet('Data');

    // Add data to worksheet
    worksheet.addRows(formattedData);

    // Set response headers
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="data.xlsx"');

    // Send Excel file as response
    await workbook.xlsx.write(res);
    res.end();

    console.log("Execel file is working")
  } catch (error) {
    console.error('Error exporting data:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.get("/search/:key", async (req, resp) => {
  try {
    let result = await Blood.find({
      "$or": [
        { name: { $regex: req.params.key } },
        { age: { $regex: req.params.key } },
        { bloodGroup: { $regex: req.params.key } }
      ]
    });
    resp.send(result);
  } catch (error) {
    console.error('Error searching blood donations:', error);
    resp.status(500).send('Internal Server Error');
  }
});




 
app.listen(3100);

