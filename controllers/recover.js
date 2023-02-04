import debug from "debug";
import transactionsDb from "../db/transactions.js";

const log = debug(`currency_converter:controller:recover`);

export default function recover(req, res, next) {
    const userId = req.params.userId.toUpperCase() || "";
    const results = transactionsDb.filter(document => document.userId === userId);
    results.length > 0 ? res.json(results) : res.json({message: `No register for userId.`})
}