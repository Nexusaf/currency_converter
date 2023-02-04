import debug from "debug";
import fs from "fs";
import usersDb from "../db/users.js";
import userHasRegistration from "../utils/userHasRegistration.js";
import formatId from "../utils/formatId.js";
import isValidId from "../utils/validate.js";

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

    if (!isValidId(document.userId)) {
        res.json({ message: "Invalid ID" });
        return;
    }
    
    if (userHasRegistration(document.userId, usersDb, res)) {
        res.json({ message: "User has registered" });
        return;
    }
    
    insertDb(document, res);
    res.json(document);    
}

const insertDb = (doc, res) => {
    usersDb.push(doc);
    let data = `export default ${JSON.stringify(usersDb, null, 2)}`;

    fs.writeFile('./db/users.js', data, err => {
        if(err) next(err);
        res.json(doc);
    });
}