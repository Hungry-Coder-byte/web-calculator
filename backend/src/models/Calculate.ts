import mongoose, { Document, Schema } from 'mongoose';

interface ICalculate extends Document {
  expression: string;
  result: number;
  createdAt: Date;
}

const CalculateSchema: Schema = new Schema({
  expression: { type: String, required: true },
  result: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Calculate = mongoose.model<ICalculate>('Calculate', CalculateSchema);

export default Calculate;