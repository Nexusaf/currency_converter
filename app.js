import express from "express";
import logger from "morgan";
import debug from "debug";
import indexRoute from "./routes/index.js";
import cookieParser from "cookie-parser";

const app = express();
const log = debug(`currency_converter:app`);

app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(express.json());
app.use(indexRoute);
app.use(logger('dev'));

export default app;