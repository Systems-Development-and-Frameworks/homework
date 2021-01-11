import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './config';

export default async function context({ req }) {
  let token = req.headers.authorization || '';
  token = token.replace('Bearer ', '');
  const jwtSign = (payload) => jwt.sign(payload, JWT_SECRET);
  try {
    const decoded = await jwt.verify(token, JWT_SECRET);
    return { ...decoded, jwtSign };
  } catch (e) {
    return { jwtSign };
  }
}
