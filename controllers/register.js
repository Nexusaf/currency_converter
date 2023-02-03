import debug from "debug";
import fs from "fs";
import usersDb from "../db/users.js"

const log = debug(`currency_converter:controler:register_post`);

export default function register(req, res, next) {
    const nickName = req.body.nickName || "";
    const id = req.params.userId || req.body.userId;
    const msg = {message: "Id already in used"}

    const document = {
        userId: formatId(id),
        nickName: nickName,
        register_date: new Date()
    }

    userHasRegistration(document.userId, usersDb, res) ? insertDb(document, res) : res.json(msg);
}

const insertDb = (doc, res) => {
    usersDb.push(doc);
    let data = `export default ${JSON.stringify(usersDb, null, 2)}`;

    fs.writeFile('./db/users.js', data, err => {
        if(err) next(err);
        res.json(doc);
    });
}

const userHasRegistration = (id, db, res) => {
    if(isValidId(id)) {
        for (let i = 0; i < db.length; i++) {
            if(db[i].userId === id){
                return false;
            }
        }
        return true;
    } else {
        res.redirect('/');
    }
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