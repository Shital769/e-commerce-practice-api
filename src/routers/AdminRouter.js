import express from "express";
const router = express.Router();
import { v4 as uuidv4 } from "uuid";
import { emailVerificationValidation } from "../middlewares/joiMiddleware.js";
import {
  createNewAdmin,
  updateAdmin,
  findUser,
} from "../models/admin/AdminModel.js";
import { hashPassword, comparePassword } from "../utils/bcrypt.js";
import {
  newAccountEmailVerificationEmail,
  emailVerifiedNotification,
} from "../utils/nodemailer.js";

//admin registration
router.post("/register", async (req, res, next) => {
  try {
    req.body.password = hashPassword(req.body.password);

    req.body.emailVerificationCode = uuidv4();

    const result = await createNewAdmin(req.body);

    if (result?._id) {
      const uniqueLink = `${process.env.FRONTEND_ROOT_URL}/verify?c=${result.emailVerificationCode}&email=${result.email}`;
      newAccountEmailVerificationEmail(uniqueLink, result);
    }

    res.json({
      status: "error",
      message: "Error, unable to create a user.",
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.message = "There is already user exist with this email";
      error.errorCode = 200;
    }
    next(error);
  }
});

//admin user email verification
router.post("/verify", emailVerificationValidation, async (req, res, next) => {
  try {
    const obj = {
      status: "active",
      isEmailverified: true,
      emailVerificationCode: "",
    };

    const user = await updateAdmin(req.body, obj);

    if (user?._id) {
      //send email notification
      emailVerifiedNotification(user);

      res.json({
        status: "success",
        message: "Your account has been verified.You may login now.",
      });
      return;
    }

    res.json({
      status: "error",
      message: "The link is invalid or expired",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
