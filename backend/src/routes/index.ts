import * as Router from "koa-router";
import * as send from "koa-send";

import ApiRouter from "./api";
import PassportRouter from "./passport";

const router = new Router();
const apiRouter = new ApiRouter(router);
const passportRouter = new PassportRouter(router);

apiRouter.post();
passportRouter.askUserCredentials("auth/vkontakte", "vkontakte", {
	scope: "email"
});
passportRouter.getAccessToken("auth/vkontakte/callback", "vkontakte", {
	successRedirect: "/join",
	failureRedirect: "/login"
});
router.get("/join", async (ctx: any, next) => {
	console.log("sesstion", ctx.session);
	await send(ctx, "src/public/index.html");
});

export default router;
