import { Router } from "express";
import errorHandle from "../controllers/errorHandler.js";
import root from "../controllers/root.js"

const routes = new Router();

routes.get('/', root);
routes.use(errorHandle.notFound);
routes.use(errorHandle.finalErrorHandle);

export default routes;