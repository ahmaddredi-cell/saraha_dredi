import express from "express";
import * as authController from "./Controller/Auth.controller.js";
import { asynHandler } from "../../Middleware/errorHandling.js";
import validation from "../../Middleware/validation.js";
import { signinSchema, signupSchema } from "./Auth.validation.js";
const app = express();

app.post("/signup", validation(signupSchema), asynHandler(authController.signup));
app.post("/signin", validation(signinSchema), asynHandler(authController.signin));
app.get("/confirmEmail/:token", asynHandler(authController.confirmEmail));
app.get("/NowconfirmEmail/:refreshtoken", asynHandler(authController.nowconfirmEmail));

export default app;
