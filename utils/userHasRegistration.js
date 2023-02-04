import debug from "debug";

const log = debug('currency_converter:utils:userHasRegistration')

const userHasRegistration = (id, db) => {
    for (let i = 0; i < db.length; i++) {
        if (db[i].userId === id) {
            log(i);
            return true
        }
    }
    return false
}

export default userHasRegistration;