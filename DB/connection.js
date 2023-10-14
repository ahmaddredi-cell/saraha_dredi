import mongoose from "mongoose";
const connectDB = async () => {
  return await mongoose
    .connect(process.env.DB_local)
    .then(() => {
      console.log("DB Connection established");
    })
    .catch((error) => {
      console.log(`error to connnect db : ${error}`);
    });
};
export default connectDB;
