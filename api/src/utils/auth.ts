import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';

const publicKey = Buffer.from(process.env.AUTH_PUBLIC_KEY as string, 'base64');
export const verifySignature = (token: string, signature: string) => {
  return crypto
    .createVerify('RSA-SHA256')
    .update(token)
    .verify(publicKey, signature, 'hex');
};

/**
 * Calculate hash for verifying signature from Crypton
 */
export const calcSignature = (stringData: string) => {
  return crypto
    .createHmac('sha512', process.env.WEXO_SECRET as string)
    .update(stringData)
    .digest('hex');
};

/**
 * Validates token
 * throws exception for bad tokens
 *
 * @author Viktor Nagy <viktor.nagy@01people.com>
 */
export const verifyJwtToken = (token: string): string => {
  try {
    const authCert = Buffer.from(
      process.env.AUTH_PUBLIC_KEY as string,
      'base64'
    );
    const jwtPayload = jwt.verify(token, authCert) as any;
    return jwtPayload.pid;
  } catch (error) {
    switch (error.message) {
      case 'jwt expired':
      case 'invalid signature':
        throw new Error(error.message);
      default:
        throw new Error('invalid token');
    }
  }
};
