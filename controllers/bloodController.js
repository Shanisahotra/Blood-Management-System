const Blood = require('../models/BloodDonation');
const XLSX = require('xlsx');
const path = require('path');
const exceljs = require('exceljs');

exports.uploadExcelFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ status: 400, success: false, msg: 'No file uploaded' });
    }

    const filePath = path.resolve(__dirname, '../uploads', req.file.filename);
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const headerMapping = {
      'Name': 'name',
      'Email': 'email',
      'Age': 'age',
      'Blood Group': 'bloodGroup',
      'Unit': 'unit',
      'Disease': 'disease'
    };

    const transformedData = worksheet.map(row => {
      const newRow = {};
      for (let key in row) {
        if (headerMapping[key]) {
          newRow[headerMapping[key]] = row[key];
        }
      }
      return newRow;
    });

    await Blood.insertMany(transformedData);

    res.send({ status: 200, success: true, msg: 'File uploaded and data saved successfully' });
  } catch (error) {
    console.error('Error processing file:', error);
    res.status(500).send({ status: 500, success: false, msg: error.message });
  }
};

exports.getAllDonors = async (req, res) => {
  try {
    let blood = await Blood.find();
    if (blood.length > 0) {
      res.send(blood);
    } else {
      res.send({ result: "No record found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

exports.deleteDonor = async (req, res) => {
  try {
    const result = await Blood.deleteOne({ _id: req.params.id });
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getDonorById = async (req, res) => {
  try {
    let result = await Blood.findOne({ _id: req.params.id });
    if (result) {
      res.send(result);
    } else {
      res.status(404).send("No record found");
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

exports.updateDonorById = async (req, res) => {
  try {
    const result = await Blood.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.send(result);
  } catch (error) {
    console.error('Error updating donor:', error);
    res.status(500).send('Internal server error');
  }
};

exports.exportData = async (req, res) => {
  try {
    const result = await Blood.find();

    const formattedData = [
      ['Name', 'Email', 'Age', 'Blood Group', 'Unit', 'Disease'],
      ...result.map(item => [item.name, item.email, item.age, item.bloodGroup, item.unit, item.disease])
    ];

    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet('Data');

    worksheet.addRows(formattedData);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="data.xlsx"');

    await workbook.xlsx.write(res);
    res.end();

    console.log("Excel file is working");
  } catch (error) {
    console.error('Error exporting data:', error);
    res.status(500).send('Internal Server Error');
  }
};

exports.searchDonors = async (req, res) => {
  try {
    let result = await Blood.find({
      "$or": [
        { name: { $regex: req.params.key, $options: 'i' } },
        { age: { $regex: req.params.key, $options: 'i' } },
        { bloodGroup: { $regex: req.params.key, $options: 'i' } }
      ]
    });
    res.send(result);
  } catch (error) {
    console.error('Error searching blood donations:', error);
    res.status(500).send('Internal Server Error');
  }
};
