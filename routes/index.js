import { Router } from "express";
import errorHandle from "../controllers/errorHandler.js";
import index from "../controllers/index.js";
import userRegister from "../controllers/userRegister.js";
import convert from "../controllers/convert.js";
import recover from "../controllers/recover.js";

const routes = new Router();

routes.get("/", index);
routes.get("/recover/:userId", recover);
routes.post(["/register/", "/register/:userId"], userRegister);
routes.post("/convert/:userId", convert);

routes.use(errorHandle.notFound);
routes.use(errorHandle.finalErrorHandle);

export default routes;