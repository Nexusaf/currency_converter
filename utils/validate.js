import debug from "debug";

const log = debug('currency_converter:utils:isValidId');

const isValidId = id => {
    const idLenght = 5;
    const letterNumber = /^([a-zA-Z0-9]+)$/;
    const isValidLength = id && id.length === idLenght;
    const isValidFormat = letterNumber.test(id)
    log(isValidLength && isValidFormat);
    return isValidLength && isValidFormat;
}

export default isValidId;