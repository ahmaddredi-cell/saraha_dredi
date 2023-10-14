import jwt from "jsonwebtoken";
import userModel from "../../DB/Models/User.model.js";
import { asynHandler } from "./errorHandling.js";
export const auth = asynHandler(async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization?.startsWith(process.env.BEARERKEY)) {
    return res.status(401).json({ message: "Ivalid authorization" });
  }

  const token = authorization.split(process.env.BEARERKEY)[1];
  if (!token) {
    return res.status(401).json({ message: "Invaliad authorizatin" });
  }
  const decoded = jwt.verify(token, process.env.LOGINSIGNATURE);
  const authUser = await userModel.findById(decoded.id).select("userName email");
  if (!authUser) {
    return res.status(401).json({ message: "Invaliad data AUth" });
  }
  req.user = authUser;
  next();
});
