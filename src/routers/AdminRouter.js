import express from "express";
const router = express.Router();
import { v4 as uuidv4 } from "uuid";
import { createNewAdmin } from "../models/admin/AdminModel.js";

//admin registration
router.post("/register", async (req, res, next) => {
  try {
    // req.body.password = hashpassword(req.body.password)

    const result = await createNewAdmin(req.body);

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

export default router;
