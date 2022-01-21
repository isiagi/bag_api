import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name should be provides'],
  },
  email: {
    type: String,
    required: [true, 'Email should be provided'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
    unique: true
  },
  password: {
      type: String,
      required:[true, 'Password should be provided'],
      minlength: 6
  }
});

userSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.jwtToken = async function () {
  const sign = jwt.sign({userId: this._id}, 'hellolove', {expiresIn: '30d'})
  return sign
}

userSchema.methods.matchPassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password)
  return isMatch;
}

const userModel = mongoose.model('User', userSchema)

export default userModel
