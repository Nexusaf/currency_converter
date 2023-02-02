import debug from "debug";

const log = debug(`currency_converter:routes:root`)

export default function index(req, res, next) {
    const data = {
        project: "currency_converter",
        
    }

    res.status = 200;
    res.json(data);
}