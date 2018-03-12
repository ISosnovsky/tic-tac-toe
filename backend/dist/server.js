"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const db_1 = require("./db");
const config_1 = require("./config");
const AuthController_1 = require("./controllers/AuthController");
const AuthService_1 = require("./services/AuthService");
const AuthRepository_1 = require("./repositories/AuthRepository");
const AuthRepository = new AuthRepository_1.default();
const AuthService = new AuthService_1.default(AuthRepository);
const AuthController = new AuthController_1.default(AuthService);
const app = new Koa();
db_1.default.sync({ force: true });
app.use(bodyParser());
const router = new Router();
app.use(router.routes());
router.post("/join", (ctx) => __awaiter(this, void 0, void 0, function* () {
    console.log("sdf");
    AuthController.join(ctx);
}));
app.listen(config_1.default.port, () => {
    console.log(`Server running on ${config_1.default.port}`);
});
const VKontakteStrategy = require("passport-vkontakte").Strategy;
// User session support middlewares. Your exact suite might vary depending on your app's needs.
app.use(require("cookie-parser")());
app.use(require("body-parser").urlencoded({ extended: true }));
app.use(require("express-session")({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new VKontakteStrategy({
    clientID: VKONTAKTE_APP_ID,
    clientSecret: VKONTAKTE_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/vkontakte/callback"
}, function myVerifyCallbackFn(accessToken, refreshToken, params, profile, done) {
    // Now that we have user's `profile` as seen by VK, we can
    // use it to find corresponding database records on our side.
    // Also we have user's `params` that contains email address (if set in
    // scope), token lifetime, etc.
    // Here, we have a hypothetical `User` class which does what it says.
    User.findOrCreate({ vkontakteId: profile.id })
        .then(function (user) {
        done(null, user);
    })
        .catch(done);
}));
// User session support for our hypothetical `user` objects.
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    User.findById(id)
        .then(function (user) {
        done(null, user);
    })
        .catch(done);
});
//# sourceMappingURL=server.js.map