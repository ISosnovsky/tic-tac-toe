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
			console.log("myVerifyCallbackFn");
			User.findOrCreate({ where: { id: profile.id } })
				.then(function(user: [User, boolean]) {
					console.log("doneeeee", done);
					done(null, user);
				})
				.catch(function(err: [User, boolean]) {
					done(err, null);
				});
		}
	)
);

passport.serializeUser(function(user, done) {
	console.log("serializeUser");
	done(null, user);
});

passport.deserializeUser(function(id: any, done) {
	console.log("deserializeUser");
	User.findById(id.id)
		.then(function(user: User) {
			done(null, user);
		})
		.catch(done);
});

router.get("/join", async ctx => {
	console.log("JOIN");
	await send(ctx, "src/public/index.html");
});

router.get("/auth", passport.authenticate("vkontakte"));

router.get("/auth/vkontakte/callback", async (ctx, next) => {
	console.log("/auth/vkontakte/callback");
	passport.authenticate("vkontakte", {
		successRedirect: "/join",
		failureRedirect: "/join228"
	})(ctx, next);
});

app.listen(config.port, () => {
	console.log(`Server running on ${config.port}`);
});
