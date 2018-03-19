import * as Router from "koa-router";

const router = new Router();

import ApiRouter from "./api";
import PassportRouterFactory from "./passport";

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

export { apiRouterAuth, vkPassportRouter };
