const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: { type: String, minlength: 5, maxlength: 20, required: true }
});

module.exports = mongoose.model('Department', departmentSchema);