import * as Koa from "koa";
import * as Router from "koa-router";
import * as bodyParser from "koa-bodyparser";
import * as passport from "passport";

import sequelize from "./db";
import config from "./config";

import AuthControllerFactory from "./controllers/AuthController";
import AuthServiceFactory from "./services/AuthService";
import AuthRepositoryFactory from "./repositories/AuthRepository";

import { VKontakteStrategy } from "passport-vkontakte";

const AuthRepository = new AuthRepositoryFactory();
const AuthService = new AuthServiceFactory(AuthRepository);
const AuthController = new AuthControllerFactory(AuthService);

const app = new Koa();

sequelize.sync({ force: true });

app.use(bodyParser());

const router = new Router();
app.use(router.routes());

router.post("/join", async ctx => {
	AuthController.join(ctx);
});

app.use(passport.initialize());
app.use(passport.session());

passport.use(
	new VKontakteStrategy(
		{
			clientID: "6405800",
			clientSecret: "JL1BXqyTkRpDRnwbd7oJ",
			callbackURL: "http://localhost:3000/auth/vkontakte/callback"
		},
		function myVerifyCallbackFn(
			accessToken: string,
			refreshToken: string,
			params: string,
			profile: string,
			done: () => void
		) {
			// Now that we have user's `profile` as seen by VK, we can
			// use it to find corresponding database records on our side.
			// Also we have user's `params` that contains email address (if set in
			// scope), token lifetime, etc.
			// Here, we have a hypothetical `User` class which does what it says.
			User.findOrCreate({ vkontakteId: profile.id })
				.then(function(user) {
					done(null, user);
				})
				.catch(done);
		}
	)
);

// User session support for our hypothetical `user` objects.
passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id)
		.then(function(user) {
			done(null, user);
		})
		.catch(done);
});

app.listen(config.port, () => {
	console.log(`Server running on ${config.port}`);
});
