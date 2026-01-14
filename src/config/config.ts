import dotenv from "dotenv";

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  dbURI: string;
  baseURI: string;
  saltrounds: number;
}

const config: Config = {
  port: Number(process.env.PORT),
  nodeEnv: String(process.env.NODE_ENV),
  dbURI: String(process.env.MONGODB_DATABASE),
  baseURI: String(process.env.BASE_URL),
  saltrounds: Number(process.env.SALT_ROUNDS),
};

export default config;
