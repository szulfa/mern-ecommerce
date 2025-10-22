import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();
router.post('/register', async (req,res)=>{
  try{
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if(existingUser){
      return res.status(400).json({ msg:'Email already registered' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role });
    const token = jwt.sign({ id:user._id }, process.env.JWT_SECRET);

    res.json({ user:{ name:user.name, email:user.email, role:user.role }, token });
  }catch(err){
    res.status(400).json({ msg:'Registration failed', err });
  }
});

router.post('/login', async (req,res)=>{
  try{
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user) return res.status(404).json({ msg:'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if(!match) return res.status(400).json({ msg:'Wrong password' });

    const token = jwt.sign({ id:user._id }, process.env.JWT_SECRET);
    res.json({ user:{ name:user.name, email:user.email, role:user.role }, token });
  }catch(err){
    res.status(400).json({ msg:'Login failed', err });
  }
});

router.post('/forgot-password', async (req,res)=>{
  try{
    const { email } = req.body;

    const user = await User.findOne({ email });
    if(!user){
      return res.status(404).json({ msg:'Email not registered' });
    }

    res.json({ msg:'Check your email for reset instructions.' });
  }catch(err){
    res.status(500).json({ msg:'Server error', err });
  }
});

export default router;
