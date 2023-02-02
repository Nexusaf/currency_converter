import express from "express";
import logger from "morgan";
import debug from "debug";
import indexRoute from "./routes/index.js"

const app = express();
const log = debug(`currency_converter:app`);

app.use(indexRoute);
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(logger('dev'));

export default app;