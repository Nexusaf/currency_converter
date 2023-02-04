import express from "express";
import indexRoute from "./routes/index.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(express.json());
app.use(indexRoute);

export default app;