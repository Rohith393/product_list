import express from 'express';
import dotenv from 'dotenv';
import { connectdb } from './config/db.js';
import productRoutes from './routes/product.routes.js'
import userRoutes from './loginmodel/user.js'
import cors from 'cors'; 
dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());
app.use("/api/product", productRoutes)
app.use('/api/users', userRoutes);
app.listen(5000,()=>{
  connectdb();
  console.log(`server starting at 5000`)
})