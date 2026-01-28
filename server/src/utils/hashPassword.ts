import bcrypt from "bcrypt";
import config from "../config/config";

export async function hashPass(password: string): Promise<string> {
  return await bcrypt.hash(password, config.saltrounds);
}
