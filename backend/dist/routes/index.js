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
const api_1 = require("./api");
const passport_1 = require("./passport");
const router = new Router();
const apiRouter = new api_1.default(router);
const passportRouter = new passport_1.default(router);
apiRouter.post();
passportRouter.askUserCredentials("auth/vkontakte", "vkontakte", {
    scope: "email"
});
passportRouter.getAccessToken("auth/vkontakte/callback", "vkontakte", {
    successRedirect: "/join",
    failureRedirect: "/login"
});
router.get("/join", (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    console.log("sesstion", ctx.session);
    yield send(ctx, "src/public/index.html");
}));
exports.default = router;
//# sourceMappingURL=index.js.map