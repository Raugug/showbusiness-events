const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const commenSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User" },
  place: { type: Schema.Types.ObjectId, ref: "User" },
  event: { type: Schema.Types.ObjectId, ref: "Event" },
  content: String,
  rate: Number
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Commen = mongoose.model('User', commenSchema);
module.exports = Commen;