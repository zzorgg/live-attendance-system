import { jwtVerify, SignJWT } from "jose";
import config from "../config/config";

type JwtPayload = {
  userId: string;
  role: string;
};

const secret = new TextEncoder().encode(config.jwtSecretKey);

export async function createToken({ userId, role }: JwtPayload) {
  const token = await new SignJWT({ userId, role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer("http://localhost:3001")
    .setAudience("https://localhost:3000")
    .setExpirationTime(config.jwtExpiresIn)
    .sign(secret);

  return token;
}

export async function verifyToken(token: string): Promise<JwtPayload> {
  const { payload } = await jwtVerify(token, secret)
  return payload as unknown as JwtPayload;
}
