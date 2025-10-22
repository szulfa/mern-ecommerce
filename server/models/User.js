import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['seller','buyer'], default:'buyer' }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
