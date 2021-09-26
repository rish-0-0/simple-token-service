import jwt, {
  Jwt,
  JwtPayload,
  Secret,
  SignOptions,
  VerifyErrors
} from 'jsonwebtoken';

export function generate (payload: object, key: Secret, options: SignOptions)
: Promise<Error | string | null | undefined> {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, key, options, (err, encoded) => {
      if (err) {
        reject(err);
      }
      resolve(encoded);
    });
  });
}

export function verify (token: string, key: Secret)
: Promise<VerifyErrors | JwtPayload | undefined | null> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, key, (err, decoded) => {
      if (err) {
        reject(err);
      }
      resolve(decoded);
    });
  });
}

export function decode (token: string): Jwt | null {
  return jwt.decode(token, { complete: true });
}
