import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import calculateRoutes from './routes/calculate';
import historyRoutes from './routes/history';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI as string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});

app.use('/api/calculate', calculateRoutes);
app.use('/api/history', historyRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Web Calculator API');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});