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
const passport = require("koa-passport");
const session = require("koa-session");
const send = require("koa-send");
const VKontakteStrategy = require("passport-vkontakte").Strategy;
const db_1 = require("./db");
const config_1 = require("./config");
const User_1 = require("./db/models/User");
const AuthController_1 = require("./controllers/AuthController");
const AuthService_1 = require("./services/AuthService");
const AuthRepository_1 = require("./repositories/AuthRepository");
const AuthRepository = new AuthRepository_1.default();
const AuthService = new AuthService_1.default(AuthRepository);
const AuthController = new AuthController_1.default(AuthService);
const app = new Koa();
const router = new Router();
db_1.default.sync({ force: true });
router.post("/join", (ctx) => __awaiter(this, void 0, void 0, function* () {
    AuthController.join(ctx);
}));
app.keys = ["asdasd"];
app
    .use(bodyParser())
    .use(session(app))
    .use(passport.initialize())
    .use(passport.session())
    .use(router.routes());
router.get("/join", (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    console.log("ОЩШТ");
    yield send(ctx, "src/public/index.html");
}));
router.get("/auth/vkontakte", passport.authenticate("vkontakte", { scope: "email" }));
router.get("/auth/vkontakte/callback", passport.authenticate("vkontakte", {
    successRedirect: "/join",
    failureRedirect: "/login"
}));
passport.use(new VKontakteStrategy({
    clientID: "6405800",
    clientSecret: "CblmEOUs5qGAIJbDSmly",
    callbackURL: "http://localhost:3000/auth/vkontakte/callback"
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
    console.log("deserialize", id);
    User_1.default.findById(id)
        .then((foundUser) => {
        done(null, "ого" + "пиздярики");
    })
        .catch(done);
});
app.use((ctx, next) => __awaiter(this, void 0, void 0, function* () {
    console.log("uuuusssssseeeeee", ctx.state.user);
    if (ctx.isAuthenticated()) {
        ctx.type = "html";
        ctx.body = { success: true };
        yield next();
    }
    else {
        ctx.body = { success: false };
        ctx.throw(401);
    }
}));
app.listen(config_1.default.port, () => {
    console.log(`Server running on ${config_1.default.port}`);
});
//# sourceMappingURL=server.js.map