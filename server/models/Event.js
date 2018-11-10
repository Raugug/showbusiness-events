const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const eventSchema = new Schema({
  title: String,
  place: { type: Schema.Types.ObjectId, ref: "User" },
  description: String,
  artist: String,
  photo: String,
  artistURL: String,
  video: String,
  date: Date,
  datestr: String,
  time: String,
  price: {type: String, default: "Free entry"},
  count: {type: Number, default: 0},
  type: { type: String, enum: ['Standup', 'Play', 'Concert', 'Session'] },
  joined: [{ type: Schema.Types.ObjectId, ref: "User" }],
  
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;