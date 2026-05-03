import express, { Request, Response } from 'express';
import { z } from 'zod';
import Calculate from '../models/Calculate';
import { calculateExpression } from '../controllers/calculateController';

const router = express.Router();

// Zod schema for validation
const calculationSchema = z.object({
  expression: z.string().nonempty(),
});

// POST route to perform calculation
router.post('/', async (req: Request, res: Response) => {
  try {
    const parsedData = calculationSchema.parse(req.body);
    const result = calculateExpression(parsedData.expression);
    
    const calculation = new Calculate({ expression: parsedData.expression, result });
    await calculation.save();

    res.status(200).json({ result });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET route to retrieve calculation history
router.get('/history', async (req: Request, res: Response) => {
  try {
    const history = await Calculate.find();
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE route to clear calculation history
router.delete('/history', async (req: Request, res: Response) => {
  try {
    await Calculate.deleteMany({});
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;