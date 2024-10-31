import { body } from "express-validator";
import prisma from "../../prisma/client/index.js";

const validateUser = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is invalid")
    .custom(async (value, { req }) => {
      if (!value) {
        throw new Error("Email is required");
      }
      const user = await prisma.user.findUnique({ where: { email: value } });
      if (user && user.id !== Number(req.params.id)) {
        throw new Error("Email already exists");
      }
      return true;
    }),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

export default validateUser;
