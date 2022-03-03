const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please Add a name'],
  },
  email: {
    type: String,
    required: [true, 'Please Add a email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please Add a email'],
  },
});

userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

// userSchema.methods.createJWT = function () {
//   return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
//     expiresIn: 360000,
//   });
// };

module.exports = mongoose.model('User', userSchema);
