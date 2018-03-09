import * as Koa from "koa";
import * as Router from "koa-router";
import * as bodyParser from "koa-bodyparser";

import sequelize from "./db";
import config from "./config";

import AuthControllerFactory from "./controllers/AuthController";
import AuthServiceFactory from "./services/AuthService";
import AuthRepositoryFactory from "./repositories/AuthRepository";

const AuthRepository = new AuthRepositoryFactory();
const AuthService = new AuthServiceFactory(AuthRepository);
const AuthController = new AuthControllerFactory(AuthService);

const app = new Koa();
const router = new Router();

sequelize.sync({ force: true });

app.use(bodyParser());

router.post("/join", async ctx => {
	AuthController.join(ctx);
});

app.listen(config.port, () => {
	console.log(`Server running on ${config.port}`);
});
