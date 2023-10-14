import userModel from "../../../../DB/Models/User.model.js";
import { asynHandler } from "../../../Middleware/errorHandling.js";
import cloudinary from "../../../Services/cloudinary.js";
export const profile = asynHandler(async (req, res) => {
  const { secure_url } = await cloudinary.uploader.upload(req.file.path, {
    folder: `${process.env.APP_NAME}/user/${req.user._id}/profile`,
  });

  const user = await userModel.findByIdAndUpdate(req.user._id, { profilePic: secure_url }, { new: true });
  return res.json({ message: user });
});
