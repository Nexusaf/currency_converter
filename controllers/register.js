import debug from "debug";
import fs from "fs";
import usersDb from "../db/users.js"

const log = debug(`currency_converter:controler:register_post`);

//Ainda falta implementar regra para não adicionar ID duplicado

export default function register(req, res, next) {
    const nickName = req.body.nickName || "";
    const id = req.params.userId || req.body.userId;

    const data = {
        userId: formatId(id),
        nickName: nickName,
        register_date: new Date()
    }

    isValidId(id) ? appendDb(data, res) : res.redirect('/');
}

const appendDb = (data, res) => {
    usersDb.push(data);

    fs.writeFile('./db/users.js', `export default ${JSON.stringify(usersDb, null, 2)}`, err => {
        if(err) next(err);
        res.json(data);
    });
}

const isValidId = id => {
    const idLenght = 5;
    const letterNumber = /^([a-zA-Z0-9]+)$/;
    const isValidLength = id && id.length === idLenght;
    const isValidFormat = letterNumber.test(id)

    return isValidLength && isValidFormat;
}

const formatId = id => {
    return `${id}`.toUpperCase();
}