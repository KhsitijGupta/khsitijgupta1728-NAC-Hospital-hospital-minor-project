const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    name: {
    type: String,
    required:true
  },
  email: {
    type: String,
    required:true,
    unique: true
},
phone: {
    type: String,
    required:true,
    unique: true
},
preferredDate: {
    type: Date,
    required:true
},
comments: {
    type: String
  }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;