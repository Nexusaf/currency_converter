import express from "express";
import logger from "morgan";
import exchange_list from "./external_api/api_exchange.js";
import debug from "debug";

const app = express();
const log = debug(`currency_converter:app`);
const  BASE  = exchange_list.base;
const TARGET = exchange_list.rates["EUR"];

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(logger('dev'));

log(BASE);
log(TARGET);

export default app;