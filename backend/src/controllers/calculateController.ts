import { Request, Response } from 'express';
import { z } from 'zod';
import Calculate from '../models/Calculate';

// Zod schema for validation
const calculationSchema = z.object({
  expression: z.string().nonempty(),
});

// Function to evaluate the expression
const evaluateExpression = (expression: string): number => {
  // Using Function constructor for safe evaluation of arithmetic expressions
  return new Function(`'use strict'; return (${expression})`)();
};

// Controller function to handle calculation
export const calculateExpression = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsedData = calculationSchema.parse(req.body);
    const result = evaluateExpression(parsedData.expression);

    const calculation = new Calculate({ expression: parsedData.expression, result });
    await calculation.save();

    res.status(200).json({ result });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};