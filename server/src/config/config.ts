import dotenv from "dotenv";

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  dbURI: string;
  baseURI: string;
  saltrounds: number;
  secret_key: string;
}

const config: Config = {
  port: Number(process.env.PORT),
  nodeEnv: String(process.env.NODE_ENV),
  dbURI: String(process.env.MONGODB_DATABASE),
  baseURI: String(process.env.BASE_URL),
  saltrounds: Number(process.env.SALT_ROUNDS),
  secret_key: String(process.env.JWT_SECRET),
};

export default config;
