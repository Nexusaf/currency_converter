
import transactionsDb from "../db/transactions.js";

export default function recover(req, res) {
	const userId = req.params.userId.toUpperCase() || "";
	const results = transactionsDb.filter(document => document.userId === userId);
	results.length > 0 ? res.json(results) : res.json({message: "No register for userId."});
}