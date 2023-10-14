import userModel from "../../../../DB/Models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "../../../Services/sendEmail.js";

export const signup = async (req, res, next) => {
  const { userName, email, password, gender } = req.body;

  const user = await userModel.findOne({ email });
  if (user) {
    //return res.status(409).json({ message: "Email Exists" });
    return next(new Error("Email Exists"));
  }
  const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALTROUND));
  const userCreated = new userModel({ userName, email, password: hashedPassword, gender });
  await userCreated.save();

  const token = jwt.sign({ email }, process.env.EMAILTOKEN, { expiresIn: "1h" });
  const refreshToken = jwt.sign({ email }, process.env.EMAILTOKEN, { expiresIn: 60 * 60 * 24 });

  const link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}`;
  const refreshLink = `${req.protocol}://${req.headers.host}/auth/NowconfirmEmail/${refreshToken}`;
  const html = `<a href=${link}>verify email</a> <br/><br/><h2>OR<h2/><a href=${refreshLink}>req new Email to verify email</a>`;
  sendEmail(email, "Confirm Email", html);
  return res.status(201).json({ message: "sucsses", user: userCreated._id });
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  const isValidPassword = user && (await bcrypt.compare(password, user?.password));

  if (!user || !isValidPassword) {
    //return res.status(404).json({ message: "Invaliad DATA" });
    return next(new Error("data Invalid"));
  }
  const token = jwt.sign({ id: user._id }, process.env.LOGINSIGNATURE);
  return res.status(200).json({ message: "sucsses", token });
};

export const confirmEmail = async (req, res, next) => {
  const { token } = req.params;
  const decoded = jwt.verify(token, process.env.EMAILTOKEN);

  const user = await userModel.findOneAndUpdate({ email: decoded.email, confirmEmail: false }, { confirmEmail: true });
  if (!user) {
    //return res.status(400).json({ message: "your email is confirm" });
    return next(new Error("your email is confirm"));
  } else {
    return res.redirect(process.env.FRONTEND_LOGIN);
  }
};

export const nowconfirmEmail = async (req, res, next) => {
  const { refreshtoken } = req.params;
  const decoded = jwt.verify(refreshtoken, process.env.EMAILTOKEN);
  const token = jwt.sign({ email: decoded.email }, process.env.EMAILTOKEN, { expiresIn: "1h" });
  const link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}`;

  const html = `<a href=${link}>verify email</a>`;
  sendEmail(decoded.email, "Confirm Email", html);
  return res.status(201).json({ message: "new Email send sucssessfully" });
};
