const isValidId = id => {
	const idLenght = 5;
	const letterNumber = /^([a-zA-Z0-9]+)$/;
	const isValidLength = id && id.length === idLenght;
	const isValidFormat = letterNumber.test(id);

	return isValidLength && isValidFormat;
};

export default isValidId;