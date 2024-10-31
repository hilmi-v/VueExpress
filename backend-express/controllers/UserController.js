import express from "express";
import prisma from "../prisma/client/index.js";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";

const findUsers = async (req, res) => {
  try {
    //get all user
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
      orderBy: {
        id: "asc",
      },
    });

    res.status(200).json({
      success: true,
      messages: "get all data succesfully",
      data: users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      messages: "internal server error",
    });
  }
};

//create user
const createUser = async (req, res) => {
  const errors = validationResult(req);

  //if validation error
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: "validation Error",
      errors: errors.array(),
    });
  }

  //make hashed password using bcrypt
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  //create a user
  try {
    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const findUserbyId = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (user === null) {
      return res.status(404).json({
        success: false,
        messages: "user not found",
      });
    }

    res.status(200).json({
      success: true,
      messages: "get user data succesfully",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      messages: "internal server error",
    });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const errors = validationResult(req);

  //if validation error
  if (!errors.isEmpty()) {
    res.status(422).json({
      success: false,
      message: "validation Error",
      errors: errors.array(),
    });
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  try {
    const user = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      },
    });

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

export { findUsers, createUser, findUserbyId, updateUser, deleteUser };
