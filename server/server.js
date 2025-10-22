import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './config.js';

import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import uploadRoutes from './routes/uploads.js';

const app = express();
app.use(cors({ origin:"https://mern-ecommerce-alpha-gold.vercel.app", credentials: true }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/uploads', uploadRoutes);

mongoose.connect(config.MONGO_URI)
  .then(()=>console.log('MongoDB connected'))
  .catch(err=>console.log(err));

app.listen(config.PORT, ()=>console.log(`Server running on port ${config.PORT}`));
