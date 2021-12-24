import express from "express";
import { body, validationResult } from "express-validator";
import User from "../models/Users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "config";
import authMiddleware from "../middleware/authMiddleware.js";

const authRouter = express.Router();

//  @ /api/auth
//  get logged in user
//  Private
authRouter.get("/", authMiddleware, async (req, res) => {
  try {
    let user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//  @ /api/auth
//  log in a user
//  Public
authRouter.post(
  "/",
  [
    body("email", "Please enter a valid email address").isEmail(),
    body("password", "Please enter a valid password").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }

      let check = await bcrypt.compare(password, user.password);

      if (!check) {
        return res.status(401).json({ msg: "Invalid credentials" });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600000 },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  }
);

export default authRouter;
