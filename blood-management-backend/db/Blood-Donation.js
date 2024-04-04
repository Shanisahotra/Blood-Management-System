const mongoose = require('mongoose');

const BloodSchema = new mongoose.Schema({
    name:String,
    age:String,
    bloodgroup:String,
    unit:String,
    disease:String,
    userId:String
});

module.exports = mongoose.model('blood-donations',BloodSchema);