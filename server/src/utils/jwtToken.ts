import { SignJWT } from "jose";
import config from "../config/config";

type JwtPayload = {
  userId: string;
  role: string;
};

const secret = new TextEncoder().encode(config.secret_key);

export async function createToken({ userId, role }: JwtPayload) {
  const token = await new SignJWT({ userId, role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer("http://localhost:3001")
    .setAudience("https://localhost:3000")
    .setExpirationTime("2h")
    .sign(secret);

  return token;
}
