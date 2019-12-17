import { User } from 'core';
import dotenv from 'dotenv';
import jwt, { VerifyErrors } from 'jsonwebtoken';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;

// returns user name
export function verify(token: string): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err: VerifyErrors, decoded: Record<string, any> | string) => {
      if (err) {
        return reject(err);
      }
      resolve(decoded.sub);
    });
  });
}

export function sign(user: User): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { name: user.name },
      JWT_SECRET,
      {
        expiresIn: '1d',
        subject: user.name,
      },
      (err: Error, encoded: string) => {
        if (err) {
          return reject(err);
        }
        resolve(encoded);
      },
    );
  });
}
