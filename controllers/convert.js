import debug from "debug";
import getExchangeRate from "../external_api/api_exchange.js";
import isValidId from "../utils/validate.js";
import formatId from "../utils/formatId.js";

const log = debug(`currency_converter:controller:convert`);

export default async function convert(req, res, next) {
    let userId = formatId(req.params.userId || req.body.userId);
    userId = isValidId(userId) ? userId : res.redirect('/');

    const transaction = await executeConvert(req);
    let {...data} = {userId, ...transaction};
    data = JSON.stringify(data);

    res.end(data);
}

const executeConvert = async req => {
    const transactionId = generateTransactionId();
    const base = req.body.base + "" || ""; 
    const target = req.body.target + "" || "";
    const amount = req.body.amount
    const exchange_rate = await getExchangeRate(base, target);
    const converted_amout = amount * exchange_rate;
    const date = new Date();

    return {transactionId, base, target, amount, exchange_rate, converted_amout, date};
}

const generateTransactionId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
        let randIndex = Math.floor(Math.random() * chars.length);
        result += chars.charAt(randIndex);
    }
    return result;
}