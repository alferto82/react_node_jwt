// Importing Node packages required for schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//= ===============================
// Mail Schema
//= ===============================
const MailSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  }
},
{
  timestamps: true
});

module.exports = mongoose.model('Mail', MailSchema);
