import { Router } from "express";
import z from "zod";
import logger from "../../logger";
import { User } from "../../models/user";
import {
  type Login,
  login,
  type Register,
  register,
} from "../../schema/authSchema";
import { comparePass, hashPass } from "../../utils/password";
import { createToken } from "../../utils/jwtToken";

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

export const signin = router.post("/login", async (req, res) => {
  const result = login.safeParse(req.body);

  if (!result.success) {
    const tree = z.treeifyError(result.error);
    return res.status(400).json({
      success: false,
      errors: tree,
    });
  }

  const data: Login = result.data;

  const user = await User.findOne({
    email: data.email,
  }).select("+password");

  if (!user) {
    return res.status(400).json({
      success: false,
      error: "Invalid email or password",
    });
  }

  const isValid = await comparePass(data.password, user.password);

  if (!isValid) {
    return res.status(401).json({
      success: false,
      error: "password do not match",
    });
  }

  const jwtToken = await createToken({
    userId: user._id.toString(),
    role: user.role ?? "student",
  });

  res.status(200).json({
    success: true,
    data: {
      token: jwtToken,
    },
  });
});
