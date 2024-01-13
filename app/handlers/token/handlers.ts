import { IToken } from './types';
import { sign, verify, VerifyErrors, Secret } from 'jsonwebtoken';

export const createToken = (token: IToken): string => {
  return sign(token, process.env.JWT_SECRET as Secret, {
    expiresIn: token.expiresIn || '1d',
  });
};

export const verifyToken = async (
  token: string
): Promise<VerifyErrors | IToken> => {
  return new Promise((resolve, reject) => {
    verify(token, process.env.JWT_SECRET as Secret, (err, payload) => {
      if (err) return reject(err);
      resolve(payload as IToken);
    });
  });
};

/**
 * WIP
 * @param token
 */
export const invalidateToken = (token: string): string => {
  return '';
};
