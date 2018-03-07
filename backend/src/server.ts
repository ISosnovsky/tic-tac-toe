import * as Koa from "koa";
import * as Router from "koa-router";
import * as bodyParser from "koa-bodyparser";

import AuthControllerFactory from "./controllers/AuthController";
import AuthServiceFactory from "./services/AuthService";

const dbFactory = {};

const AuthService = new AuthServiceFactory(dbFactory);
const AuthController = new AuthControllerFactory(AuthService);

const app = new Koa();
const router = new Router();

app.use(bodyParser());
router.post("/login", async ctx => {
  AuthController.login(ctx);
});

app.use(router.routes());

app.listen(3000);

console.log("Server running on  3000");
