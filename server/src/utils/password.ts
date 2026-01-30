import bcrypt from "bcrypt";
import config from "../config/config";

export async function hashPass(password: string): Promise<string> {
  return await bcrypt.hash(password, config.saltrounds);
}

export async function comparePass(
  password: string,
  userPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(password, userPassword);
}
