import mongoose from "mongoose";
const adminSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "inactive",
    },
    address: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      reuired: true,
      unique: true,
      index: 1,
    },
    password: {
      type: String,
      reuired: true,
      default: "inactive",
    },
    emailVerificationCode: {
      type: String,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    fName: {
      type: String,
      required: true,
    },
    lName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Admin_user", adminSchema);
