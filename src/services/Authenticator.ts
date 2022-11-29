import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export interface AuthenticationPayload {
  id: string;
  userName: string;
}

export class Authenticator {
  generateToken(payload: AuthenticationPayload): string {
    const token = jwt.sign(payload, process.env.JWT_KEY as string, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return token;
  }

  getTokenPayload(token: string): AuthenticationPayload {
    const payload = jwt.verify(token, process.env.JWT_KEY as string);
    return payload as AuthenticationPayload;
  }
}
