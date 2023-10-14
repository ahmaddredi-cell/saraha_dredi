import express from "express";
import * as messageController from "./Controller/Messages.controller.js";
import { asynHandler } from "../../Middleware/errorHandling.js";
import { auth } from "../../Middleware/Auth.Middleware.js";
const app = express();

app.post("/:receiverId", asynHandler(messageController.sendMessages));
app.get("/", auth, asynHandler(messageController.getMessages));

export default app;
