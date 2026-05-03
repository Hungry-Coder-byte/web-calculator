import { Request, Response } from 'express';
import History from '../models/History';
import { z } from 'zod';

// Zod schema for validation
const historySchema = z.object({
  id: z.string().nonempty(),
});

// Controller to handle fetching calculation history
export const getHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const history = await History.find().sort({ createdAt: -1 });
    res.status(200).json(history);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch history' });
  }
};

// Controller to handle clearing calculation history
export const clearHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    await History.deleteMany({});
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Failed to clear history' });
  }
};