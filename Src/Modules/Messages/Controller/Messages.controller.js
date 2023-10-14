import messageModel from "../../../../DB/Models/Message.model.js";
import userModel from "../../../../DB/Models/User.model.js";

export const getMessages = async (req, res) => {
  const messagesList = await messageModel.find({ receiverId: req.user._id });

  return res.json({ message: "messagesRecived", messagesList });
};
export const sendMessages = async (req, res) => {
  const { receiverId } = req.params;
  const { message } = req.body;
  const user = await userModel.findById(receiverId);
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  } else {
    const createMessage = await messageModel.create({ message, receiverId });
    return res.status(201).json({ message: "success" });
  }
};
