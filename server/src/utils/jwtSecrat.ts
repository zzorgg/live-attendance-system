import crypto from "node:crypto";

export function secret() {
  return crypto.randomBytes(64).toString("hex");
}
