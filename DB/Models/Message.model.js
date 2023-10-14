import mongoose, { Schema, Types, model } from "mongoose";

const MessageSchema = new Schema(
  {
    message: {
      type: String,
      require: true,
    },
    receiverId: {
      type: Types.ObjectId,
      ref: "User",
      require: true,
    },
  },
  { timestamps: true }
);
const messageModel = mongoose.models.Message || model("Message", MessageSchema);
export default messageModel;
