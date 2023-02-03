import debug from "debug";

const log = debug(`currency_converter:controler:register_post`)

export default function register(req, res, next) {
    if(req.params.userId) {
        const id = req.params.userId.toUpperCase();
        res.status = 200;
        res.json({userId: id, isValidUserId: isValidId(id)});
    } else {
        const id = req.body.userId || {};
        res.status = 200;
        res.json(id);
    }

}

const isValidId = (id) => {
    const idLenght = 5;
    const letterNumber = /^([a-zA-Z0-9 _-]+)$/;
    const isValidLength = id && id.length === idLenght;
    const isValidFormat = letterNumber.test(id)

    return isValidLength && isValidFormat;
}