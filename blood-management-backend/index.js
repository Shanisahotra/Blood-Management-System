const express = require("express");
const cors = require("cors");
require('./db/config');
const User = require("./db/Users");
const Blood = require("./db/Blood-Donation");
const app = express();
const exceljs = require('exceljs');
// const XLSX = require('xlsx');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

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

app.post('/blood-donation', async (req, res) => {
  try {
    const { name, email } = req.body;
    
    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
      port: 587, // Gmail SMTP port
      secure: false, // false for other ports
      auth: {
        user: '	jonathanzeeshan25@gmail.com', // Your Gmail address
        pass: 'gjaz xwau otio kxgw', // Your Gmail password
      },
    });

    // Send confirmation email
    await transporter.sendMail({
      from: 'jonathanzeeshan25@gmail.com', // Sender address (your Gmail address)
      to: email, // Recipient address (donor's email)
      subject: 'Confirmation of Blood Donation',
      text: `Dear ${name},\n\nThank you for your blood donation. Your contribution is greatly appreciated.\n\nSincerely,\nThe Blood Donation Team`,
    });
     console.log('Email is working');
    res.status(200).json({ message: 'Donation successful' });
  } catch (error) {
    console.error('Error adding blood donation:', error);
    res.status(500).send('Internal Server Error');
  }
});

  

 
app.listen(3100);

