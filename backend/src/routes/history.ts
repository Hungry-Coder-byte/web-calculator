import express, { Request, Response } from 'express';
import { z } from 'zod';
import History from '../models/History';
import { z } from 'zod';

const router = express.Router();

// Zod schema for validation
const historySchema = z.object({
  id: z.string().nonempty(),
});

// GET route to retrieve calculation history
router.get('/', async (req: Request, res: Response) => {
  try {
    const history = await History.find().sort({ createdAt: -1 });
    res.status(200).json(history);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch history' });
  }
});

// DELETE route to clear calculation history
router.delete('/', async (req: Request, res: Response) => {
  try {
    await History.deleteMany({});
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Failed to clear history' });
  }
});

export default router;