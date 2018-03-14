import * as Koa from "koa";
import * as Router from "koa-router";
import * as bodyParser from "koa-bodyparser";
import * as passport from "koa-passport";
import * as session from "koa-session";
import * as send from "koa-send";

const VKontakteStrategy = require("passport-vkontakte").Strategy;

import sequelize from "./db";
import config from "./config";
import User from "./db/models/User";

import AuthControllerFactory from "./controllers/AuthController";
import AuthServiceFactory from "./services/AuthService";
import AuthRepositoryFactory from "./repositories/AuthRepository";

const AuthRepository = new AuthRepositoryFactory();
const AuthService = new AuthServiceFactory(AuthRepository);
const AuthController = new AuthControllerFactory(AuthService);

const app = new Koa();
const router = new Router();

sequelize.sync({ force: true });

router.post("/join", async ctx => {
	AuthController.join(ctx);
});
app.keys = ["asdasd"];
app
	.use(bodyParser())
	.use(session(app))
	.use(passport.initialize())
	.use(passport.session())
	.use(router.routes());

router.get("/join", async ctx => {
	await send(ctx, "src/public/index.html");
});

router.get(
	"/auth/vkontakte",
	passport.authenticate("vkontakte", { scope: "email" })
);

router.get(
	"/auth/vkontakte/callback",
	passport.authenticate("vkontakte", {
		successRedirect: "/join",
		failureRedirect: "/login"
	})
);

passport.use(
	new VKontakteStrategy(
		{
			clientID: "6405800",
			clientSecret: "CblmEOUs5qGAIJbDSmly",
			callbackURL: "http://localhost:3000/auth/vkontakte/callback"
		},
		function myVerifyCallbackFn(
			accessToken: string,
			refreshToken: string,
			params: object,
			profile: any,
			done: (err: any, user: any) => void
		) {
			User.findOrCreate({ where: { id: profile.id } })
				.then((user: [User, boolean]) => {
					done(null, user);
				})
				.catch((err: [User, boolean]) => {
					done(err, null);
				});
		}
	)
);

passport.serializeUser((user: any, done) => {
	console.log("sdfsdfsdfsdf", user);
	done(null, user);
});

passport.deserializeUser((user: any, done) => {
	console.log("deserializeUserdeserializeUser");
	User.findById(user.id)
		.then((foundUser: User) => {
			done(null, foundUser);
		})
		.catch(done);
});

app.listen(config.port, () => {
	console.log(`Server running on ${config.port}`);
});
