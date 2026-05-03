import mongoose, { Document, Schema } from 'mongoose';

interface IHistory extends Document {
  expression: string;
  result: number;
  createdAt: Date;
}

const HistorySchema: Schema = new Schema({
  expression: { type: String, required: true },
  result: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const History = mongoose.model<IHistory>('History', HistorySchema);

export default History;