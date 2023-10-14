import * as dotenv from "dotenv";
dotenv.config();
import initApp from "./Src/Modules/app.router.js";
import express from "express";

const app = express();

const PORT = process.env.PORT || 4000;
initApp(app, express);

app.listen(PORT, () => console.log(`Server is Running ${PORT}!`));
