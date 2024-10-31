import express from "express";
import { validateRegister, validateLogin } from "../utils/validators/auth.js";
import validateUser from "../utils/validators/user.js";
import verifyToken from "../middlewares/auth.js";
import register from "../controllers/RegisterController.js";
import login from "../controllers/LoginController.js";
import {
  findUsers,
  createUser,
  findUserbyId,
  updateUser,
  deleteUser,
} from "../controllers/UserController.js";
const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);

router.get("/admin/users", verifyToken, findUsers);
router.post("/admin/users", verifyToken, validateUser, createUser);
router.get("/admin/users/:id", verifyToken, findUserbyId);
router.put("/admin/users/:id", verifyToken, validateUser, updateUser);
router.delete("/admin/users/:id", verifyToken, deleteUser);

export default router;
