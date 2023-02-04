import debug from "debug";
import getExchangeRate from "../external_api/api_exchange.js";
import isValidId from "../utils/validate.js";
import formatId from "../utils/formatId.js";
import symbols from "../utils/symbols.js";
import transactionsDb from "../db/transactions.js";
import userHasRegistration from "../utils/userHasRegistration.js";
import fs from "fs";

const log = debug(`currency_converter:controller:convert`);

export default async function convert(req, res, next) {
    let userId = formatId(req.params.userId || req.body.userId);
    if(!isValidId(userId) && !isValidInputData(req.body, symbols)) {
        res.redirect('/');
    }

    const transaction = await executeConvert(req);
    let {...document} = {userId, ...transaction};
    document = JSON.stringify(document);
    
    if(isValidId(userId) && userHasRegistration(userId, transactionsDb, res)) {
        insertDb(document, next);
        res.end(document);
    } else {
        log('here')
        res.redirect('/');
    }
}

const executeConvert = async req => {
    const transactionId = generateTransactionId();
    const base = `${req.body.base}` || ""; 
    const target = `${req.body.target}` || "";
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

const isValidInputData = (inputData, symbols) => {    
    const base = inputData.base || "";
    const amount = inputData.amount;
    const target = inputData.target || "";

    const isValidAmount =  amount > 0;
    const isValidBase =  base.length === 3 && symbols.includes(base);
    const isValidTarget =  target.length === 3 && symbols.includes(target);

    return [isValidAmount, isValidBase, isValidTarget].every(predicate => Boolean(predicate));
}

const insertDb = (doc, next) => {
    doc = JSON.parse(doc);
    transactionsDb.push(doc);
    let data = `export default ${JSON.stringify(transactionsDb, null, 2)}`;
    
    fs.writeFile('./db/transactions.js', data, err => {
        if (err) next(err)
        let lastIndex = transactionsDb.length - 1;
        let transactionId = transactionsDb[lastIndex].transactionId;
        log(`New document inserted: Transaction ID: ${transactionId}`);
    });
}