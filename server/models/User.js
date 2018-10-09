const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  type: {type: String, enum: ['Client', 'Place'] },
  placekind: { type: String, enum: ['Bar', 'Play', 'Concert', 'session'] },
  photo: { type: String},
  eventsHost: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  eventsGo: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  favUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  favPlaces: [{ type: Schema.Types.ObjectId, ref: "User" }],
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
