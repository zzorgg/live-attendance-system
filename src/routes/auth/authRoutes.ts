import * as bcrypt from "bcrypt";
import { Router } from "express";
import { jwtVerify, SignJWT } from "jose";
import z from "zod";
import { User } from "../../models/user";
import { type Register, register } from "../../schema/authSchema";
import { secret } from "../../utils/jwtSecrat";

const router = Router();
const result = secret();
const jwtSecret = new TextEncoder().encode(result);

export const signup = router.post("/signup", async (req, res) => {
  const result = register.safeParse(req.body);
  console.log(result);

  if (!result.success) {
    const tree = z.treeifyError(result.error);
    return res.status(400).json({
      success: false,
      errors: tree,
    });
  }

  const data: Register = result.data;

  const saltRounds = 10;

  const hashpass = await bcrypt.hash(data.password, saltRounds);

  const exists = await User.findOne({
    email: data.email,
  });

  if (exists) {
    return res.status(400).json({
      success: false,
      error: "User already exists",
    });
  }

  const user = await User.create({
    username: data.username,
    email: data.email,
    password: hashpass,
    role: data.role,
  });

  console.log(user._id);

  res.status(201).json({
    success: true,
    data: {
      _id: user._id,
      username: data.username,
      email: data.email,
      password: hashpass,
      role: data.role,
    },
  });
});

export const login = router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      error: "Invalid email or password",
    });
  }
  const match = await bcrypt.compare(password, String(user.password));
  if (!match) {
    return res.status(404).json({
      error: "Invalid email or password",
    });
  }

  const jwt_token = await new SignJWT({
    userId: user._id.toString(),
    role: user.role,
  })
    .setProtectedHeader({
      alg: "HS256",
    })
    .setExpirationTime("60m")
    .sign(jwtSecret);

  console.log(jwt_token);
  console.log("\n");
  console.log(jwtSecret);

  res.status(200).json({
    success: "ok",
    _id: user._id,
    data: {
      token: jwt_token,
    },
  });
});

export const me = router.get("/me", async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }
  console.log(token);

  console.log(jwtSecret);
  console.log(result);

  const payload = await jwtVerify(token, jwtSecret);

  console.log(payload.payload.userId);

  const user = await User.findOne({ _id: payload.payload.userId });

  console.log(user);

  res.status(200).json({
    status: "ok",
    data: {
      _id: user?._id,
      username: user?.username,
      email: user?.email,
      role: user?.role,
    },
  });
});
