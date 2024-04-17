const mongoose = require('mongoose');

const BloodSchema = new mongoose.Schema({
    name: String,
    email: String, 
    age: String,
    bloodGroup: String,
    unit: String,
    disease: String,
    userId: String
});

module.exports = mongoose.model('blood-donations', BloodSchema);
