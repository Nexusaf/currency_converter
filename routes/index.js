import { Router } from "express";
import errorHandle from "../controllers/errorHandler.js";
import index from "../controllers/index.js"
import register from "../controllers/register.js"
import convert from "../controllers/convert.js"
import recover from "../controllers/recover.js"

const routes = new Router();

routes.get('/', index);
routes.get('/recover/:id', recover);
routes.post('/register/:id', register);
routes.post('/convert/:id', convert);

routes.use(errorHandle.notFound);
routes.use(errorHandle.finalErrorHandle);

export default routes;