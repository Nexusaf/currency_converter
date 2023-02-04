import debug from "debug";
import getExchangeRate from "../external_api/api_exchange.js";
import isValidId from "../utils/validate.js";
import formatId from "../utils/formatId.js";

const log = debug(`currency_converter:controller:convert`);

export default async function convert(req, res, next) {
    let userId = formatId(req.params.userId || req.body.userId);
    userId = isValidId(userId) ? userId : res.json({message: "You must provide a valid ID"});
    const obj = await executeConvert(req);
    const {...data} = {userId, ...obj};

    log(data);
    res.end();
}

const executeConvert = async req => {
    const base = req.body.base + "" || ""; 
    const target = req.body.target + "" || "";
    const amount = req.body.amount
    const exchange_rate = await getExchangeRate(base, target);
    const converted_amout = amount * exchange_rate;

    return {base, target, amount, exchange_rate, converted_amout};
}