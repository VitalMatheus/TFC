import * as Jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

export default async function validateToken(req: Request, res: Response) {
  const token = req.headers.authorization;
  const secret = process.env.JWT_SECRET || 'jwt_secret';

  if (!token) return res.status(401).json({ message: 'Token not found' });
  return Jwt.verify(token, secret);
}
