import createError from "http-errors";

const errorHandler = {
    notFound(req, res, next) {
        var err = createError(404, "Not Found");
        next(err);
    },

    finalErrorHandle(err, req, res, next) {
        if (err.status !== 404) console.log(err.stack);
        res.status = err.status;
        res.json(`${err.status} ${err.message}`);
    }
}

export default errorHandler