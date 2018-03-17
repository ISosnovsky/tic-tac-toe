"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("koa-passport");
const VKontakteStrategy = require("passport-vkontakte").Strategy;
const User_1 = require("./db/models/User");
passport.use(new VKontakteStrategy({
    clientID: "6405800",
    clientSecret: "CblmEOUs5qGAIJbDSmly",
    callbackURL: "http://localhost:4000/auth/vkontakte/callback"
}, function myVerifyCallbackFn(accessToken, refreshToken, params, profile, done) {
    User_1.default.findOrCreate({ where: { id: profile.id } })
        .then((user) => {
        done(null, user[0]);
    })
        .catch((err) => {
        done(err, null);
    });
}));
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    done(null, id);
});
//# sourceMappingURL=passport.js.map