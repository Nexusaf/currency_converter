import debug from "debug";

const log = debug('currency_converter:utils:userHasRegistration')

const userHasRegistration = (id, db, res) => {
    for (let i = 0; i < db.length; i++) {
        if (db[i].userId === id) return true
    }
    return false
}

export default userHasRegistration;