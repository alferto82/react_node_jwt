// Importing Node packages required for schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//= ===============================
// Poll Schema
//= ===============================
const PollSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'Poll', required: true},
  questions: [{ 
    id: {
      type: Number,
      unique: true,
      required: true
    },
    question: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true
    }
  }]
},
{
  timestamps: true
});

module.exports = mongoose.model('Poll', PollSchema);
