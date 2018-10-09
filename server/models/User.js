const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  isPlace: Boolean,
  photo: String,
  placeType: { type: String, enum: ['Bar', 'Play', 'Concert', 'session'] },
  eventsHost: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  eventsGo: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  favUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  favPlaces: [{ type: Schema.Types.ObjectId, ref: "User" }]
  //location: { type: { type: String }, coordinates: [Number] }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});
//userSchema.index({ location: '2dsphere' });
const User = mongoose.model('User', userSchema);
module.exports = User;
