import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prisma/client/index.js";
import { validationResult } from "express-validator";

const login = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: "validation Error",
      errors: errors.array(),
    });
  }

  try {
    //search user by email
    const user = await prisma.user.findFirst({
      where: {
        email: req.body.email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });

    //if user not found
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    //compare password
    const comparedPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    // if password doesnt same
    if (!comparedPassword) {
      return res.status(401).json({
        success: false,
        message: "login failed",
      });
    }

    // make a jsonwebtoken
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // send user without password
    const { password, ...userWithoutPassword } = user;

    res.status(200).send({
      success: true,
      message: "User logged in successfully",
      data: {
        user: userWithoutPassword,
        token,
      },
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "internal server error",
      error: error.message,
    });
  }
};

export default login;
