const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  displayName: { type: String },
  image: { type: String },
  email: { type: String },
  facebook: { type: Object },
  google: { type: Object },
});

module.exports = mongoose.model('User', UserSchema);
