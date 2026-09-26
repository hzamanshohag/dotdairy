import { Schema, models, model } from "mongoose";

const adminSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    userRole: {
      type: String,
      enum: ["admin", "superadmin"],
      default: "admin",
    },

    passwordHash: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Admin = models.Admin || model("Admin", adminSchema);

export default Admin;
