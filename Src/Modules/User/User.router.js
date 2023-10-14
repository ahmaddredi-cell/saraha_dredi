import express, { Router } from "express";
import * as userController from "./Controller/User.controller.js";
import { auth } from "../../Middleware/Auth.Middleware.js";
import fileUpload, { fileValidation } from "../../Services/multer.js";

const app = express();
app.get("/", fileUpload(fileValidation.image).single("image"), auth, userController.profile);
export default app;
