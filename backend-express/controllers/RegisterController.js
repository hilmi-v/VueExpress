import express from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import prisma from "../prisma/client/index.js";

const register = async (req, res) => {
  const err = validationResult(req);

  if (!err.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: "validation Error",
      errors: err.array(),
    });
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export default register;
