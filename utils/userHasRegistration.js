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

export default userHasRegistration;