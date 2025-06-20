// models/letter.model.js
import mongoose from 'mongoose';

const letterSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  letterType: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Letter = mongoose.model('Letter', letterSchema);
export default Letter;