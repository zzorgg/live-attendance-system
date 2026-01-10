import dotenv from "dotenv";

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  dbURI: string;
}

const config: Config = {
  port: Number(process.env.PORT),
  nodeEnv: String(process.env.NODE_ENV),
  dbURI: String(process.env.MONGODB_DATABASE),
};

export default config;
