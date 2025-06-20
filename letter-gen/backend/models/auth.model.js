// models/user.model.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true, minlength: 3},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Remember to hash passwords!
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
export default User;
