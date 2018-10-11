const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const eventSchema = new Schema({
  title: String,
  place: { type: Schema.Types.ObjectId, ref: "User" },
  description: String,
  artist: String,
  date: String,
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