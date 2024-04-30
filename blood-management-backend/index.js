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


app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(fileUpload());
// const XlsxPopulate = require('xlsx-populate');

// // Multer middleware for handling file uploads
// const upload = multer({ dest: 'public/' });

// app.post('/api/upload', upload.single('excelFile'), (req, res) => {
//   try {
//     const filePath = req.file.path;
//     const workbook = xlsx.readFile(filePath);
//     const sheetName = workbook.SheetNames[0];
//     const sheet = workbook.Sheets[sheetName];
//     const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });

//     // Process the data as needed
//     console.log('Excel data:', data);

//     res.send({ message: 'File uploaded and processed successfully.' });
//   } catch (error) {
//     console.error('Error processing file:', error);
//     res.status(500).send({ error: 'Internal server error.' });
//   }
// });



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

