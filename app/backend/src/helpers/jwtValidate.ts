import * as Jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';

export default function validateToken(token: string): JwtPayload {
  const secret = process.env.JWT_SECRET || 'jwt_secret';

  const payload = Jwt.verify(token, secret);
  return payload as JwtPayload;
}
