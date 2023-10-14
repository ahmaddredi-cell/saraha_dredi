import mongoose, { Schema, model } from "mongoose";
const UserSchema = new Schema(
  {
    userName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    gender: {
      type: String,
      default: "Male",
      enum: ["Male", "Female"],
    },
    profilePic: {
      type: String,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.models.User || model("User", UserSchema);
export default userModel;
