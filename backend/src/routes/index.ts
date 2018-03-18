import * as Router from "koa-router";
import * as send from "koa-send";

import ApiRouter from "./api";
import PassportRouterFactory from "./passport";

const router = new Router();
const apiRouter = new ApiRouter(router);
const vkPassportRouter = new PassportRouterFactory(router, {
	authLink: "auth/vkontakte",
	authCallbackLink: "auth/vkontakte/callback",
	strategyName: "vkontakte",
	userCredentional: { scope: "email" }
});

apiRouter.post();
vkPassportRouter.init();
router.get("/join", async (ctx: any, next) => {
	console.log("sesstion", ctx.session);
	await send(ctx, "src/public/index.html");
});

export default router;
