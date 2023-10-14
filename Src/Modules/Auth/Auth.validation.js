import joi from "joi";

export const signupSchema = {
  body: joi.object({
    userName: joi.string().alphanum().required(),
    email: joi.string().email().required(),
    gender: joi.string().valid("Male", "Female"),
    password: joi.string().required(),
    cpassword: joi.string().valid(joi.ref("password")).required(),
  }),
};
export const signinSchema = joi.object({
  body: joi.object({
    email: joi.string().email().required().min(5).messages({
      "string.empty": "email is required",
      "string.email": "plz enter a valid Email",
    }),
    password: joi.string().required().messages({
      "string.empty": "Password is Required",
    }),
  }),
});
