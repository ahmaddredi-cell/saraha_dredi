import messageRouter from "./Messages/Messages.router.js";
import authRouter from "./Auth/Auth.router.js";
import userRouter from "./User/User.router.js";
import connectDB from "../../DB/connection.js";
import cors from "cors";
import { globalErrorHandler } from "../Middleware/errorHandling.js";

const initApp = (app, express) => {
  connectDB();

  app.use(express.json());
  app.use("/upload", express.static("upload"));
  app.use("/messages", messageRouter);
  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("*", (req, res) => {
    return res.json({ message: "page NOT found" });
  });
  app.use(globalErrorHandler);
};
export default initApp;
