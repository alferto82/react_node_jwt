// Importing Node packages required for schema
const mongoose = require('mongoose');
const User = require('../models/user');
const Schema = mongoose.Schema;

//= ===============================
// Activity Schema
//= ===============================
const ActivitySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true},
  activityDate: {
    type: Date,
    unique: true,
    required: true
  },
  positions: [{ 
    time: {
      type: Number,
      unique: true,
      required: true
    },
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    },
    altitude: {
      type: Number,
      required: true
    },
    speed: {
      type: Number,
      required: true
    },
    power: {
      type: Number,
      required: true
    } 
  }]
},
{
  timestamps: true
});

module.exports = mongoose.model('Activity', ActivitySchema);
