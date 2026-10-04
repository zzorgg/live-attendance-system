import dotenv from "dotenv";

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  dbURI: string;
  baseUrl: string;
  saltrounds: number;
  jwtSecretKey: string;
  jwtExpiresIn: string;
}

function required(key: string, fallback?: string): string {
  const value = process.env[key] ?? fallback;
  if (!value) throw new Error(`Missing env: ${key}`)
  return value;
}

const config: Config = {
  port: parseInt(required("PORT", "3001"), 10),
  nodeEnv: required("NODE_ENV", "development"),
  dbURI: required("MONGODB_DATABASE"),
  baseUrl: required("BASE_URL", "http://localhost:3001"),
  saltrounds: parseInt(required("SALT_ROUNDS", "10"), 10),
  jwtSecretKey: required("JWT_SECRET_KEY"),
  jwtExpiresIn: required("JWT_EXPIRES_IN", "2h")
};

export default config;
