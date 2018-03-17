import * as passport from "koa-passport";

const VKontakteStrategy = require("passport-vkontakte").Strategy;

import User from "./db/models/User";

passport.use(
	new VKontakteStrategy(
		{
			clientID: "6405800",
			clientSecret: "CblmEOUs5qGAIJbDSmly",
			callbackURL: "http://localhost:4000/auth/vkontakte/callback"
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
					done(null, user[0]);
				})
				.catch((err: [User, boolean]) => {
					done(err, null);
				});
		}
	)
);

passport.serializeUser((user: any, done) => {
	done(null, user.id);
});

passport.deserializeUser((id: any, done) => {
	done(null, id);
});
