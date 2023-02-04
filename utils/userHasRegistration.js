const userHasRegistration = (id, db) => {
	for (let i = 0; i < db.length; i++) {
		if (db[i].userId === id) return true;
	}
    
	return false;
};

export default userHasRegistration;