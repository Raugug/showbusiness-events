const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const eventSchema = new Schema({
  place: { type: Schema.Types.ObjectId, ref: "User" },
  description: String,
  date: String,
  type: { type: String, enum: ['Standup', 'Play', 'Concert', 'session'] },
  interested: [{ type: Schema.Types.ObjectId, ref: "User" }],
  
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;