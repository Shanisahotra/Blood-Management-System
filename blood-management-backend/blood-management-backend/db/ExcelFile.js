const mongoose = require('mongoose');

const ExcelSchema = new mongoose.Schema({
   
    name:{
        type:String
    },

    email:{
        type:String
    },

    age:{
        type:String
    },

    bloodGroup:{
        type:String
    },

    unit:{
        type:String
    },

    disease:{
        type:String
    },

    userId:{
        type:String
    }

   
    // name: String,
    // email: String, 
    // age: String,
    // bloodGroup: String,
    // unit: String,
    // disease: String,
    // userId: String
});

module.exports = mongoose.model('blood-donations', ExcelSchema);
