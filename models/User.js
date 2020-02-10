const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  firstName: {type: String, required: true},
  lastName: String,
  profile: [{
    type: Schema.Types.ObjectId,
    ref: "Contact",
    required: true
  }],
  contacts: [{
    type: Schema.Types.ObjectId,
    ref: "Contact"
  }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
