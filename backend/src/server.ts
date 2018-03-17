import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as passport from "koa-passport";
import * as session from "koa-session";

import sequelize from "./db";
import config from "./config";
import router from "./routes";

import "./passport";
const app = new Koa();

sequelize.sync({ force: true });

app.keys = ["asdasd"];
app
	.use(bodyParser())
	.use(session(app))
	.use(passport.initialize())
	.use(passport.session())
	.use(router.routes());

app.use(async (ctx, next) => {
	if (ctx.isAuthenticated()) {
		ctx.type = "html";
		ctx.body = { success: true };
		await next();
	} else {
		ctx.body = { success: false };
		ctx.throw(401);
	}
});

app.listen(config.port, () => {
	console.log(`Server running on ${config.port}`);
});
