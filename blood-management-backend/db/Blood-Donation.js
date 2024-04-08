const mongoose = require('mongoose');

const BloodSchema = new mongoose.Schema({
    name: String,
    age: String,
    bloodGroup: String, // Corrected field name
    unit: String,
    disease: String,
    userId: String
});

module.exports = mongoose.model('blood-donations', BloodSchema);
