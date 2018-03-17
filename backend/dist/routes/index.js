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
const Router = require("koa-router");
const send = require("koa-send");
const passport = require("koa-passport");
const api_1 = require("./api");
const router = new Router();
const apiRouter = new api_1.default(router);
apiRouter.post();
router.get("/join", (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    console.log("sesstion", ctx.session);
    yield send(ctx, "src/public/index.html");
}));
router.get("/auth/vkontakte", passport.authenticate("vkontakte", { scope: "email" }));
router.get("/auth/vkontakte/callback", passport.authenticate("vkontakte", {
    successRedirect: "/join",
    failureRedirect: "/login"
}));
exports.default = router;
//# sourceMappingURL=index.js.map