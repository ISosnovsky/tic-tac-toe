import * as Router from "koa-router";
import * as send from "koa-send";

import ApiRouter from "./api";
import PassportRouterFactory from "./passport";

import AuthControllerFactory from "../controllers/AuthController";
import AuthServiceFactory from "../services/AuthService";
import AuthRepositoryFactory from "../repositories/AuthRepository";

const AuthRepository = new AuthRepositoryFactory();
const AuthService = new AuthServiceFactory(AuthRepository);
const AuthController = new AuthControllerFactory(AuthService);

const router = new Router();

const apiRouterAuth = new ApiRouter(router);

const vkPassportRouter = new PassportRouterFactory(router, {
	authLink: "/auth/vkontakte",
	authCallbackLink: "/auth/vkontakte/callback",
	strategyName: "vkontakte",
	userCredentional: { scope: "email" },
	options: {
		successRedirect: "/join",
		failureRedirect: "/пошел_нахуй_отсюда"
	}
});

apiRouterAuth.post("join", async ctx => {
	await AuthController.join(ctx);
});

vkPassportRouter.register();

router.get("/join", async (ctx: any, next) => {
	console.log("sesstion", ctx.session);
	await send(ctx, "src/public/index.html");
});

export default router;
