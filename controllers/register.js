import debug from "debug";

const log = debug(`currency_converter:controler:register_post`)

export default function register(req, res, next) {
    const nickName = req.body.nickName || "";
    const id = req.params.userId || req.body.userId;
    isValidId(id) ? res.json({userId: id, nickName: nickName}) : res.redirect('/');
}

const isValidId = (id) => {
    const idLenght = 5;
    const letterNumber = /^([a-zA-Z0-9 _-]+)$/;
    const isValidLength = id && id.length === idLenght;
    const isValidFormat = letterNumber.test(id)

    return isValidLength && isValidFormat;
}