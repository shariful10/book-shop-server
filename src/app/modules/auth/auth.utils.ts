import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

// export const createToken = (
//   jwtPayload: { email: string; role: string },
//   secret: string,
//   expiresIn: string,
// ) => {
//   return jwt.sign(jwtPayload, secret, {
//     expiresIn,
//   });
// };

export const createToken = (
  jwtPayload: { email: string; role: string },
  secret: string,
  expiresIn: SignOptions = {},
): string => {
  return jwt.sign(jwtPayload, secret, expiresIn);
};

export const verifyToken = (token: string, secret: string): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};
