import { Router } from "express";
import z from "zod";
import logger from "../../logger";
import { User } from "../../models/user";
import { type Register, register } from "../../schema/authSchema";
import { hashPass } from "../../utils/hashPassword";

const router = Router();

export const signup = router.post("/signup", async (req, res) => {
  const result = register.safeParse(req.body);

  if (!result.success) {
    const tree = z.treeifyError(result.error);
    return res.status(400).json({
      success: false,
      errors: tree,
    });
  }

  const data: Register = result.data;

  const hashedPassword = await hashPass(data.password);

  const exists = await User.findOne({
    email: data.email,
  });

  if (exists) {
    logger.error("User already exists");
    return res.status(409).json({
      success: false,
      error: "User already exists",
    });
  }

  const user = await User.create({
    username: data.username,
    email: data.email,
    password: hashedPassword,
    role: data.role,
  });

  const safeUser = await User.findById(user._id);

  res.status(201).json({
    success: true,
    data: safeUser,
  });
  logger.info(`${safeUser?.username} has been registered`);
});
