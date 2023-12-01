const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    first_name: { type: String, required: true, maxlength: 100 },
    last_name: { type: String, required: true, maxlength: 50 },
    email: { type: String, required: true, unique: true, maxlength: 50 },
    gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
    salary: { type: Number, required: true },
});

module.exports = mongoose.model('Employee', employeeSchema);
