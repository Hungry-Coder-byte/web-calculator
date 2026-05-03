import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const authSchema = z.object({
  token: z.string().nonempty(),
});

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header is missing or malformed. It should be in the format: Bearer <token>' });
  }

  const token = authHeader.split(' ')[1];

  const validationResult = authSchema.safeParse({ token });

  if (!validationResult.success) {
    return res.status(400).json({ message: 'Invalid token format' });
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token is not valid' });
    }

    req.user = user;
    return next(); // Complete the return statement
  });
};