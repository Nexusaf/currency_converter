import debug from "debug";

const log = debug(`currency_converter:routes:root`)

export default function index(req, res, next) {
    res.status = 200;
    res.json({message: "root of project"});
}